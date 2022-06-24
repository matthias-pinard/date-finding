use rusqlite::Connection;

pub fn migration_1_2(conn: &Connection) {
    conn.execute("ALTER TABLE score ADD COLUMN bad_date TEXT", [])
        .unwrap();
    conn.execute("ALTER TABLE guess ADD COLUMN date TEXT", [])
        .unwrap();

    conn.execute("UPDATE score SET bad_date='0000-01-01' where win=false", [])
        .unwrap();
    conn.execute("UPDATE guess SET date='0000-01-01'", [])
        .unwrap();

    conn.execute("UPDATE TABLE param SET value=2 where name='version'", [])
        .unwrap();
}
