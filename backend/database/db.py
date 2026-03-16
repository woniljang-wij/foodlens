import pyodbc

def get_db():
    conn = pyodbc.connect(
        "DRIVER={SQL Server};"
        "SERVER=DESKTOP-GAAVPSO\\SQLEXPRESS;"
        "DATABASE=foodlens;"
        "Trusted_Connection=yes;"
    )
    return conn