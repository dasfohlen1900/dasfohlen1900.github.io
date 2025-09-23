body {
  font-family: Arial, sans-serif;
  background: #f6f6f6;
  margin: 0;
  padding: 0;
  color: #222;
}

.container {
  max-width: 900px;
  margin: 30px auto;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

h1, h2 { text-align: center; color: #00983a; }

section { margin: 30px 0; }

.match {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  border-bottom: 1px solid #ddd;
}
.match span.team { font-weight: bold; }
.match span.time { color: #666; }

.tabelle {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  margin-top: 10px;
}
.tabelle th, .tabelle td {
  border: 1px solid #ccc;
  padding: 6px;
}
.tabelle tbody tr:nth-child(even) { background: #f2f2f2; }
