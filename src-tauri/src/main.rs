#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::fs;

use rusqlite::{params, Connection, OptionalExtension};
use serde::Serialize;

mod migration;

const PATH: &str = "/home/matthias/.local/share/date-recall/test.db";

fn main() {
    init_db();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            save_score,
            save_guess,
            get_history,
            get_bad_guess
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn save_score(
    time: u64,
    nb_response: u64,
    win: bool,
    total_response: u64,
    date: u64,
    bad_date: Option<String>,
) -> u64 {
    let conn = Connection::open(&PATH).unwrap();
    conn.execute(
        "INSERT INTO score(time, nb_response, win, total_response, date, bad_date) VALUES (?1, ?2, ?3, ?4, ?5, ?6)",
        params![time, nb_response, win, total_response, date, bad_date],
    )
    .unwrap();
    conn.last_insert_rowid().try_into().unwrap()
}

#[tauri::command]
fn save_guess(game_id: u64, time: u64, response_number: u64, response: u8, guess: u8, date: &str) {
    let conn = Connection::open(&PATH).unwrap();
    conn.execute(
        "INSERT INTO guess(game_id, time, response_number, response, guess, date)
                 VALUES (?1, ?2, ?3 , ?4, ?5, ?6) ",
        params![game_id, time, response_number, response, guess, date],
    )
    .unwrap();
}

fn init_db() {
    fs::create_dir("/home/matthias/.local/share/date-recall").unwrap_or(());
    let conn = Connection::open(&PATH).unwrap();
    conn.execute(
        "
        CREATE TABLE IF NOT EXISTS score( 
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        time INTEGER,
        nb_response INTEGER,
        total_response INTEGER,
        win BOOL,
        date INTEGER,
        bad_date TEXT)
        ",
        params![],
    )
    .unwrap();
    conn.execute(
        "CREATE TABLE IF NOT EXISTS guess(
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             game_id INTEGER,
             time INTEGER,
             response_number INTEGER,
             response CHAR,
             guess CHAR,
             date TEXT)
            ",
        params![],
    )
    .unwrap();

    conn.execute(
        "CREATE TABLE IF NOT EXISTS param(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT, value INTEGER)",
        params![],
    )
    .unwrap();

    check_migration(&conn);
}

fn check_migration(conn: &Connection) {
    let mut stmt = conn
        .prepare("SELECT value FROM param WHERE name='version'")
        .unwrap();
    let version: Option<u32> = stmt.query_row([], |row| row.get(0)).optional().unwrap();

    match version {
        None => {
            conn.execute("INSERT INTO param(name, value) VALUES ('version', 2)", [])
                .unwrap();
        }
        Some(v) => {
            if v < 2 {
                migration::migration_1_2(conn);
            }
        }
    }
}

#[tauri::command]
fn get_history() -> Vec<Score> {
    let conn = Connection::open(&PATH).unwrap();
    let mut stmt = conn
        .prepare("SELECT id, time, nb_response, total_response, win, date, bad_date FROM score")
        .unwrap();
    let score_iter = stmt
        .query_map([], |row| {
            Ok(Score {
                id: row.get(0).unwrap(),
                time: row.get(1).unwrap(),
                nb_response: row.get(2).unwrap(),
                total_response: row.get(3).unwrap(),
                win: row.get(4).unwrap(),
                date: row.get(5).unwrap(),
                bad_date: row.get(6).unwrap(),
            })
        })
        .unwrap();

    score_iter.map(|s| s.unwrap()).collect()
}

#[tauri::command]
fn get_bad_guess(game_id: u64) -> Option<Guess> {
    let conn = Connection::open(&PATH).unwrap();
    let mut stmt = conn
        .prepare("SELECT date, response, guess from guess where game_id=?1")
        .unwrap();
    let bad_guess = stmt.query_row(params![game_id], |row| {
        Ok(Guess {
            date: row.get(0).unwrap(),
            response: row.get(1).unwrap(),
            guess: row.get(2).unwrap(),
        })
    });
    bad_guess.ok()
}

#[derive(Serialize, Debug)]
struct Score {
    id: u64,
    time: u64,
    nb_response: u64,
    total_response: u64,
    win: bool,
    date: u64,
    bad_date: Option<String>,
}

#[derive(Serialize, Debug)]
struct Guess {
    response: String,
    guess: String,
    date: String,
}
