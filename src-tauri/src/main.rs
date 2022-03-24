#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::fs;

use rusqlite::{params, Connection};

const PATH: &str = "/home/matthias/.local/share/date-recall/test.db";

fn main() {
    init_db();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![save_score])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn save_score(time: u64, nb_response: u64, win: bool) {
    println!("I'm in save score, yeah !");
    let conn = Connection::open(&PATH).unwrap();
    conn.execute(
        "INSERT INTO score(time, nb_response, win) VALUES (?1, ?2, ?3)",
        params![time, nb_response, win],
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
        win BOOL)
        ",
        params![],
    )
    .unwrap();
}
