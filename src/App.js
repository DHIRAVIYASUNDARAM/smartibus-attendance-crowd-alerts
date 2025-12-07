// App.js — Single-file Smart Bus demo (paste entire file into src/App.js)
import React, { useEffect, useState } from "react";

export default function App() {
  // ---------- Inline CSS ----------
  const css = `
    * { box-sizing: border-box; font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; }
    body { margin:0; background:#f3f4f6; color:#0f1724; }

    /* Login */
    .login-bg { min-height:100vh; display:flex; align-items:center; justify-content:center; padding:32px;
                background: linear-gradient(120deg, #3b82f6 0%, #7c3aed 100%); }
    .login-card { width:460px; background:#fff; padding:36px; border-radius:18px; box-shadow: 0 12px 40px rgba(2,6,23,0.18); text-align:center; }
    .login-title { font-size:28px; font-weight:800; margin-bottom:6px; }
    .login-sub { color:#6b7280; margin-bottom:18px; }
    .top-toggle { display:flex; gap:10px; margin-bottom:14px; }
    .toggle-btn { flex:1; padding:10px 12px; border-radius:10px; border:none; cursor:pointer; font-weight:700; }
    .toggle-btn.active { background:#2563eb; color:white; }
    .toggle-btn.inactive { background:#f3f4f6; color:#374151; }

    .role-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; margin-bottom:16px; }
    .role-btn { padding:10px; border-radius:10px; background:#f3f4f6; border:none; cursor:pointer; font-weight:700; color:#1f2937; }
    .role-btn.active { background:#2563eb; color:#fff; }

    .input { width:100%; padding:12px 14px; border-radius:10px; border:2px solid #e6eef8; margin-top:10px; font-size:15px; }
    .input:focus { outline:none; border-color:#2563eb; }

    .login-action { margin-top:16px; background:#2563eb; color:#fff; padding:12px; border-radius:10px; border:none; cursor:pointer; font-weight:800; width:100%; }

    .demo-list { margin-top:12px; color:#334155; font-size:13px; }

    /* App layout */
    .sidebar { width:260px; height:100vh; background:#0b1222; color:white; position:fixed; left:0; top:0; padding-top:22px; display:flex; flex-direction:column; }
    .brand { display:flex; align-items:center; gap:12px; padding: 0 18px 18px 18px; }
    .brand-logo { width:44px; height:44px; border-radius:8px; background:#2b60ff; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:800; }
    .brand-title { font-weight:800; font-size:18px; }
    .nav { margin-top:6px; display:flex; flex-direction:column; gap:6px; padding: 6px 8px; flex:1; overflow:auto; }
    .nav-btn { display:flex; gap:12px; align-items:center; padding:12px 16px; margin:0 10px; border-radius:10px; color:#cbd5e1; background:transparent; border:none; cursor:pointer; text-align:left; font-size:15px; }
    .nav-btn:hover { background:#0f1b2b; color:#fff; }
    .nav-btn.active { background:#11192e; color:#fff; border-left:4px solid #2563eb; }
    .logout { margin:12px; margin-top:auto; padding:12px 16px; border-radius:10px; background:transparent; color:#fff; border:1px solid rgba(255,255,255,0.06); cursor:pointer; }

    .header { background:#fff; padding:18px 28px; border-bottom:1px solid #eef2ff; margin-left:260px; display:flex; justify-content:space-between; align-items:center; position:sticky; top:0; z-index:10; }
    .header h2 { margin:0; font-size:22px; text-transform:capitalize; color:#0f1724; }
    .header-right { display:flex; align-items:center; gap:12px; }
    .notif { position:relative; cursor:pointer; color:#374151; }
    .notif-badge { position:absolute; top:-6px; right:-8px; background:#ef4444; color:#fff; width:18px; height:18px; border-radius:999px; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; }
    .avatar { width:36px; height:36px; border-radius:999px; background:#3b82f6; color:white; display:flex; align-items:center; justify-content:center; font-weight:700; }

    .content { margin-left:260px; padding:28px; min-height:calc(100vh - 80px); }

    .grid-3 { display:grid; grid-template-columns: repeat(3, 1fr); gap:20px; margin-bottom:20px; }
    .card { background:#fff; padding:20px; border-radius:14px; box-shadow: 0 8px 24px rgba(2,6,23,0.06); }
    .hero { background:linear-gradient(90deg,#16a34a,#059669); color:#fff; border-radius:14px; padding:24px; box-shadow: 0 10px 30px rgba(34, 44, 84, 0.08); }
    .hero h1 { margin:0; font-size:26px; font-weight:800; }
    .hero p { margin:6px 0 0; color: rgba(255,255,255,0.95); }

    .small-title { font-weight:700; font-size:15px; margin-bottom:10px; color:#0f1724; }
    .muted { color:#6b7280; font-size:14px; }

    .badge-green { display:inline-block; padding:6px 12px; background:#dcfce7; color:#065f46; border-radius:999px; font-weight:700; font-size:13px; }
    .progress-bg { width:100%; height:12px; background:#eef2ff; border-radius:8px; overflow:hidden; }
    .progress-fill { height:100%; background:#8B5CF6; width:60%; }

    .live { text-align:center; padding:20px; color:#374151; }

    .qr-box { width:220px; height:220px; border-radius:14px; background:#eef2ff; display:flex; align-items:center; justify-content:center; font-size:60px; margin:18px auto; }

    .list { display:flex; flex-direction:column; gap:10px; }
    .list-item { display:flex; justify-content:space-between; align-items:center; padding:12px; border-radius:10px; background:#f8fafc; }

    @media (max-width: 980px) {
      .grid-3 { grid-template-columns: 1fr; }
      .sidebar { width:72px; }
      .header { margin-left:72px; }
      .content { margin-left:72px; padding:18px; }
      .brand-title { display:none; }
      .nav-btn span { display:none; }
    }
  `;

  // ---------- Mock data (including extra students) ----------
  const mock = {
    students: [
      { id: "STU001", name: "Durgadevi P", email: "durga@sec.edu", bus: "BUS-01", seat: "A12", route: "Route-A", qr: "QR-STU001", location: "Near Saveetha College" },
      { id: "STU004", name: "Dhiraviya S", email: "dhiraviya@sec.edu", bus: "BUS-02", seat: "B07", route: "Route-B", qr: "QR-STU004", location: "Thandalam Junction" },
      { id: "STU005", name: "Dhanusya K", email: "dhanusya@sec.edu", bus: "BUS-02", seat: "B09", route: "Route-B", qr: "QR-STU005", location: "Thandalam Junction" },
      { id: "STU002", name: "Rahul Kumar", email: "rahul@sec.edu", bus: "BUS-01", seat: "A05", route: "Route-A", qr: "QR-STU002", location: "Near Saveetha College" },
      { id: "STU003", name: "Priya Sharma", email: "priya@sec.edu", bus: "BUS-01", seat: "A10", route: "Route-A", qr: "QR-STU003", location: "Near Saveetha College" }
    ],
    parents: [
      { id: "PAR001", name: "Mr. Prakash", email: "prakash@gmail.com", childId: "STU001" },
      { id: "PAR002", name: "Mrs. Malini", email: "malini@gmail.com", childId: "STU002" },
      { id: "PAR003", name: "Mr. Sundaram", email: "sundaram@gmail.com", childId: "STU004" }
    ],
    drivers: [
      { id: "DRV001", name: "Ravi Singh", email: "ravi@sec.edu", bus: "BUS-01", route: "Route-A", phone: "+91 98765 43210" },
      { id: "DRV002", name: "Kumar Reddy", email: "kumar@sec.edu", bus: "BUS-02", route: "Route-B", phone: "+91 98765 43211" }
    ],
    buses: [
      { id: "BUS-01", capacity: 40, occupied: 28, route: "Route-A", driver: "Ravi Singh", status: "Active", location: "Near Saveetha College" },
      { id: "BUS-02", capacity: 40, occupied: 15, route: "Route-B", driver: "Kumar Reddy", status: "Active", location: "Thandalam Junction" }
    ]
  };

  // ---------- State ----------
  const [page, setPage] = useState("login"); // login, student, parent, driver, admin, qr, track, notifications, scanner, list, users
  const [mode, setMode] = useState("login"); // login / signup
  const [role, setRole] = useState("student"); // student / parent / driver / admin
  const [email, setEmail] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [scanned, setScanned] = useState([]); // scanned students by driver
  const [gps, setGps] = useState({ lat: 13.0418, lng: 80.1769 });

  // GPS simulate
  useEffect(() => {
    if (page !== "login") {
      const id = setInterval(() => {
        setGps(prev => ({
          lat: +(prev.lat + (Math.random() - 0.5) * 0.001).toFixed(6),
          lng: +(prev.lng + (Math.random() - 0.5) * 0.001).toFixed(6)
        }));
      }, 3500);
      return () => clearInterval(id);
    }
  }, [page]);

  // helpers
  const notify = (msg) => setNotifications(prev => [...prev, { id: Date.now(), msg, time: new Date() }]);
  const qrFor = (text, size = 260) => `https://chart.googleapis.com/chart?cht=qr&chs=${size}x${size}&chl=${encodeURIComponent(text)}&choe=UTF-8`;

  // ---------- Login ----------
  const login = () => {
    const e = email.trim().toLowerCase();
    if (role === "student") {
      const s = mock.students.find(x => x.email === e);
      if (!s) return alert("Student not found. Try demo emails.");
      setCurrentUser(s); setPage("student"); notify(`Login success: ${s.name}`);
    } else if (role === "parent") {
      const p = mock.parents.find(x => x.email === e);
      if (!p) return alert("Parent not found. Try demo emails.");
      const child = mock.students.find(s => s.id === p.childId);
      setCurrentUser({ ...p, child }); setPage("parent"); notify(`Login success: ${p.name}`);
    } else if (role === "driver") {
      const d = mock.drivers.find(x => x.email === e);
      if (!d) return alert("Driver not found. Try demo emails.");
      setCurrentUser(d); setPage("driver"); notify(`Login success: ${d.name}`);
    } else if (role === "admin") {
      if (e !== "admin@demo") return alert("Admin demo email: admin@demo");
      setCurrentUser({ id: "ADM001", name: "Admin User", email: e }); setPage("admin"); notify("Welcome Admin");
    }
  };

  const logout = () => {
    setPage("login"); setCurrentUser(null); setEmail(""); setNotifications([]); setScanned([]);
  };

  // driver scanning simulation
  const handleScan = (studentId) => {
    if (scanned.find(s => s.id === studentId)) { notify("Already scanned"); return; }
    const stu = mock.students.find(s => s.id === studentId);
    if (!stu) return;
    const entry = { ...stu, scanTime: new Date().toLocaleTimeString() };
    setScanned(prev => [...prev, entry]);
    notify(`${stu.name} boarded`);
  };

  // ---------- UI small components defined inside App to access state ----------
  const Header = ({ title }) => (
    <div className="header">
      <h2>{title}</h2>
      <div className="header-right">
        <div style={{ color: "#6b7280", fontSize: 14 }}>{currentUser?.name || ""}</div>
        <div className="notif" title="Notifications">🔔{notifications.length > 0 && <div className="notif-badge">{notifications.length}</div>}</div>
        <div className="avatar">{currentUser?.name?.charAt(0) || "U"}</div>
      </div>
    </div>
  );

  const Sidebar = ({ active }) => (
    <div className="sidebar">
      <style>{css}</style>
      <div className="brand">
        <div className="brand-logo">SB</div>
        <div>
          <div className="brand-title">Smart Bus</div>
          <div style={{ fontSize: 12, color: "#94a3b8" }}>Transit Monitor</div>
        </div>
      </div>

      <div className="nav">
        <button className={`nav-btn ${active === "dashboard" ? "active" : ""}`} onClick={() => {
          if (!currentUser) return;
          if (currentUser.id && currentUser.id.startsWith("STU")) setPage("student");
          else if (currentUser.id && currentUser.id.startsWith("PAR")) setPage("parent");
          else if (currentUser.id && currentUser.id.startsWith("DRV")) setPage("driver");
          else if (currentUser.id && currentUser.id.startsWith("ADM")) setPage("admin");
        }}>🏠 <span>Dashboard</span></button>

        {/* student */}
        {currentUser && currentUser.id && currentUser.id.startsWith("STU") && (
          <>
            <button className={`nav-btn ${active === "qr" ? "active" : ""}`} onClick={() => setPage("qr")}>📷 <span>My QR Code</span></button>
            <button className={`nav-btn ${active === "track" ? "active" : ""}`} onClick={() => setPage("track")}>📍 <span>Track Bus</span></button>
            <button className={`nav-btn ${active === "notifications" ? "active" : ""}`} onClick={() => setPage("notifications")}>🔔 <span>Notifications</span></button>
          </>
        )}

        {/* parent */}
        {currentUser && (currentUser.child || (currentUser.id && currentUser.id.startsWith("PAR"))) && currentUser.id && (currentUser.id.startsWith("PAR") || currentUser.child) && (
          <>
            <button className={`nav-btn ${active === "parent" ? "active" : ""}`} onClick={() => setPage("parent")}>📍 <span>Track Child</span></button>
            <button className={`nav-btn ${active === "notifications" ? "active" : ""}`} onClick={() => setPage("notifications")}>🔔 <span>Alerts</span></button>
            <button className="nav-btn" onClick={() => alert("Call driver: " + (mock.drivers.find(d => d.bus === currentUser.child?.bus)?.phone || "N/A"))}>📞 <span>Contact Driver</span></button>
          </>
        )}

        {/* driver */}
        {currentUser && currentUser.id && currentUser.id.startsWith("DRV") && (
          <>
            <button className={`nav-btn ${active === "scanner" ? "active" : ""}`} onClick={() => setPage("scanner")}>📷 <span>QR Scanner</span></button>
            <button className={`nav-btn ${active === "list" ? "active" : ""}`} onClick={() => setPage("list")}>👥 <span>Student List</span></button>
            <button className={`nav-btn ${active === "route" ? "active" : ""}`} onClick={() => setPage("driver")}>📍 <span>Route Info</span></button>
          </>
        )}

        {/* admin */}
        {currentUser && currentUser.id && currentUser.id.startsWith("ADM") && (
          <>
            <button className={`nav-btn ${active === "admin" ? "active" : ""}`} onClick={() => setPage("admin")}>🚌 <span>Fleet Management</span></button>
            <button className={`nav-btn ${active === "users" ? "active" : ""}`} onClick={() => setPage("users")}>👥 <span>User Management</span></button>
            <button className={`nav-btn ${active === "qr" ? "active" : ""}`} onClick={() => setPage("qr")}>🔍 <span>QR Generator</span></button>
          </>
        )}

      </div>

      <button className="logout" onClick={logout}>↩ Logout</button>
    </div>
  );

  // ---------- Page components ----------
  const StudentDashboard = ({ student }) => {
    const bus = mock.buses.find(b => b.id === student.bus) || mock.buses[0];
    return (
      <>
        <Header title="Student Dashboard" />
        <div className="content">
          <div className="hero card">
            <h1>Welcome, {student.name}!</h1>
            <p className="muted">Student ID: {student.id}</p>
          </div>

          <div className="grid-3">
            <div className="card">
              <div className="small-title">Bus Details</div>
              <div style={{ fontSize: 22, fontWeight: 700 }}>{student.bus}</div>
              <div className="muted">Seat: {student.seat}</div>
              <div className="muted">Route: {student.route}</div>
              <div style={{ marginTop: 10 }}><span className="badge-green">Not Boarded</span></div>
            </div>

            <div className="card">
              <div className="small-title">Bus Occupancy</div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="muted">Occupied</div>
                <div style={{ fontWeight: 700 }}>{bus.occupied}/{bus.capacity}</div>
              </div>
              <div style={{ marginTop: 8 }} className="progress-bg">
                <div className="progress-fill" style={{ width: `${(bus.occupied / bus.capacity) * 100}%` }} />
              </div>
              <div style={{ marginTop: 10 }} className="muted">AI suggests booking early for peak hours</div>
            </div>

            <div className="card">
              <div className="small-title">Next Timing</div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>7:45 AM</div>
              <div className="muted">Pickup Point: Gate 3</div>
              <div style={{ marginTop: 8, color: "#10b981", fontWeight: 700 }}>Arriving in 15 mins</div>
            </div>
          </div>

          <div className="card">
            <div className="small-title">Live Bus Location</div>
            <div className="live">
              <div style={{ fontSize: 36 }}>📍</div>
              <div style={{ fontWeight: 700 }}>{bus.location}</div>
              <div className="muted">GPS: {gps.lat.toFixed(4)}, {gps.lng.toFixed(4)}</div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const ParentDashboard = ({ parent }) => {
    const child = parent.child;
    const bus = mock.buses.find(b => b.id === child.bus) || mock.buses[0];
    return (
      <>
        <Header title="Parent Dashboard" />
        <div className="content">
          <div className="hero card"><h1>Parent Dashboard</h1><p className="muted">Monitoring: {child?.name}</p></div>

          <div className="grid-3">
            <div className="card">
              <div className="small-title">Child Status</div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{child?.name}</div>
              <div className="muted">Bus: {child?.bus}</div>
              <div className="muted">Seat: {child?.seat}</div>
              <div style={{ marginTop: 10 }}><span className="badge-green">{child?.status || 'Not Boarded'}</span></div>
            </div>

            <div className="card">
              <div className="small-title">Driver Info</div>
              <div style={{ fontWeight: 700 }}>{bus.driver}</div>
              <div className="muted">{mock.drivers.find(d => d.bus === bus.id)?.phone}</div>
              <button style={{ marginTop: 12, width: "100%", padding: 10, background: "#10b981", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }} onClick={() => alert("Calling " + (mock.drivers.find(d => d.bus === bus.id)?.phone || "N/A"))}>Call Driver</button>
            </div>

            <div className="card">
              <div className="small-title">ETA</div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>12 mins</div>
              <div className="muted">to pickup point</div>
              <div style={{ marginTop: 8, color: "#f59e0b", fontWeight: 700 }}>AI-predicted based on traffic</div>
            </div>
          </div>

          <div className="card">
            <div className="small-title">Recent Alerts</div>
            <div className="list">
              {notifications.slice(-6).reverse().map(notif => (
                <div key={notif.id} className="list-item">
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    🔔
                    <div>
                      <div style={{ fontWeight: 700 }}>{notif.msg}</div>
                      <div className="muted" style={{ fontSize: 12 }}>{notif.time.toLocaleTimeString()}</div>
                    </div>
                  </div>
                </div>
              ))}
              {notifications.length === 0 && <div className="muted">No alerts yet</div>}
            </div>
          </div>
        </div>
      </>
    );
  };

  const DriverDashboard = ({ driver }) => {
    const bus = mock.buses.find(b => b.id === driver.bus) || mock.buses[0];
    const studentsOnRoute = mock.students.filter(s => s.bus === driver.bus);
    return (
      <>
        <Header title="Driver Dashboard" />
        <div className="content">
          <div className="hero card" style={{ background: "linear-gradient(90deg,#f97316,#ef4444)" }}>
            <h1>Driver Dashboard</h1>
            <p className="muted">{driver.name} - {driver.bus}</p>
          </div>

          <div className="grid-3">
            <div className="card">
              <div className="small-title">Route Info</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{driver.route}</div>
              <div className="muted">Bus: {driver.bus}</div>
              <div className="muted">Total Stops: 8</div>
              <div style={{ marginTop: 10 }}><span className="badge-green">Active</span></div>
            </div>

            <div className="card">
              <div className="small-title">Occupancy</div>
              <div style={{ fontSize: 26, fontWeight: 800 }}>{scanned.length}/{bus.capacity}</div>
              <div className="progress-bg"><div className="progress-fill" style={{ width: `${(scanned.length / bus.capacity) * 100}%` }} /></div>
              <div className="muted" style={{ marginTop: 8 }}>Students boarded</div>
            </div>

            <div className="card">
              <div className="small-title">Next Stop</div>
              <div style={{ fontSize: 18, fontWeight: 800 }}>Gate 3</div>
              <div className="muted">ETA: 5 mins</div>
              <div style={{ marginTop: 8, color: "#10b981", fontWeight: 700 }}>On schedule</div>
            </div>
          </div>

          <div className="card">
            <div className="small-title">QR Scanner</div>
            <div className="muted">Scan student QR codes (simulation)</div>
            <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {studentsOnRoute.map(s => (
                <button key={s.id} onClick={() => handleScan(s.id)} style={{ padding: 8, borderRadius: 8, border: "1px solid #e6eef8", background: "#fff", cursor: "pointer" }}>
                  Scan {s.id}
                </button>
              ))}
            </div>

            {scanned.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <div className="small-title">Recently Scanned</div>
                <div className="list">
                  {scanned.slice().reverse().map(item => (
                    <div key={item.id} className="list-item">
                      <div>
                        <div style={{ fontWeight: 700 }}>{item.name}</div>
                        <div className="muted" style={{ fontSize: 12 }}>{item.id} • Seat {item.seat}</div>
                      </div>
                      <div style={{ fontSize: 13, color: "#059669" }}>{item.scanTime}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  const DriverStudentsList = ({ driver }) => {
    const studentsOnRoute = mock.students.filter(s => s.bus === driver.bus);
    return (
      <>
        <Header title="Student List" />
        <div className="content">
          <div className="card">
            <div className="small-title">Student List - {driver.route}</div>
            <div className="list">
              {studentsOnRoute.map(student => {
                const boarded = scanned.find(x => x.id === student.id);
                return (
                  <div key={student.id} className="list-item">
                    <div>
                      <div style={{ fontWeight: 700 }}>{student.name}</div>
                      <div className="muted">{student.id} • {student.email}</div>
                    </div>
                    <div>
                      <div style={{ padding: "6px 10px", borderRadius: 999, background: boarded ? "#dcfce7" : "#fff7ed", color: boarded ? "#065f46" : "#92400e", fontWeight: 700 }}>
                        {boarded ? "Boarded" : "Pending"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  };

  const QRPage = ({ student }) => {
    const qrText = JSON.stringify({ id: student.id, name: student.name, bus: student.bus, seat: student.seat });
    return (
      <>
        <Header title="My QR Code" />
        <div className="content">
          <div className="card" style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 700, fontSize: 18 }}>Your QR Code</div>
            <img src={qrFor(qrText, 300)} alt="qr" style={{ width: 220, height: 220, borderRadius: 12, marginTop: 12 }} />
            <div style={{ marginTop: 12, fontWeight: 700 }}>{student.name}</div>
            <div className="muted">ID: {student.id}</div>
            <div className="muted">QR Code: {student.qr}</div>
            <div style={{ marginTop: 8 }} className="muted">Show this QR code to the driver when boarding or deboarding</div>
          </div>
        </div>
      </>
    );
  };

  const TrackPage = ({ student }) => {
    const bus = mock.buses.find(b => b.id === student.bus) || mock.buses[0];
    return (
      <>
        <Header title="Live Bus Tracking" />
        <div className="content">
          <div className="card">
            <div className="small-title">Bus Number</div>
            <div style={{ fontWeight: 800 }}>{bus?.id}</div>
            <div className="muted">Current Location</div>
            <div style={{ fontWeight: 700 }}>{bus?.location}</div>
            <div className="muted" style={{ marginTop: 12 }}>GPS: {gps.lat.toFixed(6)}, {gps.lng.toFixed(6)}</div>
          </div>
        </div>
      </>
    );
  };

  const AdminDashboard = () => (
    <>
      <Header title="Admin Dashboard" />
      <div className="content">
        <div className="hero card"><h1>Admin Dashboard</h1><p className="muted">Saveetha Engineering College</p></div>

        <div className="grid-3">
          <div className="card">
            <div className="small-title">Total Buses</div>
            <div style={{ fontSize: 28, fontWeight: 800 }}>{mock.buses.length}</div>
            <div className="muted">All operational</div>
          </div>

          <div className="card">
            <div className="small-title">Students</div>
            <div style={{ fontSize: 28, fontWeight: 800 }}>{mock.students.length}</div>
            <div className="muted">Registered users</div>
          </div>

          <div className="card">
            <div className="small-title">Drivers</div>
            <div style={{ fontSize: 28, fontWeight: 800 }}>{mock.drivers.length}</div>
            <div className="muted">Active today</div>
          </div>
        </div>
      </div>
    </>
  );

  const AdminUsers = () => (
    <>
      <Header title="User Management" />
      <div className="content">
        <div className="card">
          <div className="small-title">Students</div>
          <div className="list">
            {mock.students.map(s => <div key={s.id} className="list-item"><div><div style={{ fontWeight: 700 }}>{s.name}</div><div className="muted">{s.id} • {s.email}</div></div><div className="muted">Bus: {s.bus}</div></div>)}
          </div>
        </div>
      </div>
    </>
  );

  const NotificationsPage = () => (
    <>
      <Header title="Notifications" />
      <div className="content">
        <div className="card">
          <div className="small-title">Recent Notifications</div>
          <div className="list">
            {notifications.length === 0 && <div className="muted">No notifications</div>}
            {notifications.slice().reverse().map(n => <div key={n.id} className="list-item"><div><div style={{ fontWeight: 700 }}>{n.msg}</div><div className="muted">{n.time.toLocaleString()}</div></div></div>)}
          </div>
        </div>
      </div>
    </>
  );

  // ---------- Routing (render) ----------
  // Student view
  if (page === "student" && currentUser && currentUser.id && currentUser.id.startsWith("STU")) {
    return (
      <div>
        <style>{css}</style>
        <Sidebar active="dashboard" />
        <StudentDashboard student={currentUser} />
      </div>
    );
  }

  // Parent view
  if (page === "parent" && currentUser && (currentUser.child || (currentUser.id && currentUser.id.startsWith("PAR")))) {
    return (
      <div>
        <style>{css}</style>
        <Sidebar active="parent" />
        <ParentDashboard parent={currentUser} />
      </div>
    );
  }

  // Driver view
  if (page === "driver" && currentUser && currentUser.id && currentUser.id.startsWith("DRV")) {
    return (
      <div>
        <style>{css}</style>
        <Sidebar active="driver" />
        <DriverDashboard driver={currentUser} />
      </div>
    );
  }

  // Driver scanner page
  if (page === "scanner" && currentUser && currentUser.id && currentUser.id.startsWith("DRV")) {
    return (
      <div>
        <style>{css}</style>
        <Sidebar active="scanner" />
        <Header title="QR Scanner" />
        <div className="content">
          <div className="card">
            <div className="small-title">Scanner (simulate)</div>
            <div className="muted">Tap a student to simulate QR scan</div>
            <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {mock.students.filter(s => s.bus === currentUser.bus).map(s => (
                <button key={s.id} style={{ padding: 8, borderRadius: 8 }} onClick={() => handleScan(s.id)}>Scan {s.id}</button>
              ))}
            </div>
            {scanned.length > 0 && <div style={{ marginTop: 12 }} className="list">{scanned.slice().reverse().map(x => <div key={x.id} className="list-item"><div><div style={{ fontWeight: 700 }}>{x.name}</div><div className="muted">{x.id}</div></div><div>{x.scanTime}</div></div>)}</div>}
          </div>
        </div>
      </div>
    );
  }

  // Driver list page
  if (page === "list" && currentUser && currentUser.id && currentUser.id.startsWith("DRV")) {
    return (
      <div>
        <style>{css}</style>
        <Sidebar active="list" />
        <DriverStudentsList d={currentUser} />
      </div>
    );
  }

  // Admin pages
  if (page === "admin" && currentUser && currentUser.id && currentUser.id.startsWith("ADM")) {
    return (
      <div>
        <style>{css}</style>
        <Sidebar active="admin" />
        <AdminDashboard />
      </div>
    );
  }
  if (page === "users" && currentUser && currentUser.id && currentUser.id.startsWith("ADM")) {
    return (
      <div>
        <style>{css}</style>
        <Sidebar active="users" />
        <AdminUsers />
      </div>
    );
  }

  // QR page (student)
  if (page === "qr" && currentUser && currentUser.id && currentUser.id.startsWith("STU")) {
    return (
      <div>
        <style>{css}</style>
        <Sidebar active="qr" />
        <QRPage student={currentUser} />
      </div>
    );
  }

  // Track page
  if (page === "track") {
    if (currentUser && currentUser.id && currentUser.id.startsWith("STU")) {
      return <div><style>{css}</style><Sidebar active="track" /><TrackPage student={currentUser} /></div>;
    }
    if (currentUser && currentUser.child) {
      return <div><style>{css}</style><Sidebar active="track" /><TrackPage student={currentUser.child} /></div>;
    }
  }

  // Notifications page
  if (page === "notifications") {
    return <div><style>{css}</style><Sidebar active="notifications" /><NotificationsPage /></div>;
  }

  // Fallback -> Login
  return (
    <div className="login-bg">
      <style>{css}</style>
      <div className="login-card">
        <div style={{ fontSize: 40 }}>🚍</div>
        <div className="login-title">Smart Bus System</div>
        <div className="login-sub">AI-Enabled Transit Monitoring</div>

        <div className="top-toggle">
          <button className={`toggle-btn ${mode === "login" ? "active" : "inactive"}`} onClick={() => setMode("login")}>Login</button>
          <button className={`toggle-btn ${mode === "signup" ? "active" : "inactive"}`} onClick={() => setMode("signup")}>Sign Up</button>
        </div>

        <div className="role-grid">
          <button className={`role-btn ${role === "student" ? "active" : ""}`} onClick={() => setRole("student")}>Student</button>
          <button className={`role-btn ${role === "parent" ? "active" : ""}`} onClick={() => setRole("parent")}>Parent</button>
          <button className={`role-btn ${role === "driver" ? "active" : ""}`} onClick={() => setRole("driver")}>Driver</button>
          <button className={`role-btn ${role === "admin" ? "active" : ""}`} onClick={() => setRole("admin")}>Admin</button>
        </div>

        <input className="input" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
        {mode === "login" && <input className="input" placeholder="Password" type="password" readOnly />}

        <button className="login-action" onClick={login}>{mode === "login" ? "Login" : "Create Account"}</button>

        <div className="demo-list">Demo emails: durga@sec.edu, dhiraviya@sec.edu, dhanusya@sec.edu, rahul@sec.edu, priya@sec.edu, prakash@gmail.com, ravi@sec.edu, admin@demo</div>
      </div>
    </div>
  );
}
