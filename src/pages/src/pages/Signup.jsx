export default function Signup() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '16px' }}>
      <div style={{ maxWidth: '900px', width: '100%', background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', display: 'flex', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
        
        {/* LEFT - IMAGE */}
        <div style={{ width: '50%', background: '#f8fafc', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <img 
            src="https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=800" 
            style={{ width: '100%', height: '360px', objectFit: 'cover', borderRadius: '12px' }} 
            alt="water"
          />
          <p style={{ fontFamily: 'monospace', fontSize: '11px', marginTop: '16px', lineHeight: '1.5' }}>
            Purified water delivery, gallon<br/>cleaning, and water refill<br/>services.
          </p>
        </div>

        {/* RIGHT - FORM */}
        <div style={{ width: '50%', padding: '28px' }}>
          <h2 style={{ margin: 0, color: '#1a2a5a', fontSize: '16px', fontWeight: 700 }}>Create Your Account</h2>
          <p style={{ fontSize: '10px', color: '#94a3b8', margin: '6px 0 18px' }}>
            Sign up to manage your deliveries and track your orders seamlessly.
          </p>

          <label style={{ fontSize: '9px', fontWeight: 700 }}>FULL NAME</label>
          <input placeholder="FULL NAME" style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '9px 12px', fontSize: '12px', margin: '6px 0 12px' }} />

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ width: '50%' }}>
              <label style={{ fontSize: '9px', fontWeight: 700 }}>EMAIL ADDRESS</label>
              <input placeholder="E-mail" style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '9px 12px', fontSize: '12px', margin: '6px 0 12px' }} />
            </div>
            <div style={{ width: '50%' }}>
              <label style={{ fontSize: '9px', fontWeight: 700 }}>PHONE NUMBER</label>
              <input placeholder="Enter number" style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '9px 12px', fontSize: '12px', margin: '6px 0 12px' }} />
            </div>
          </div>

          <label style={{ fontSize: '9px', fontWeight: 700 }}>PASSWORD</label>
          <input type="password" placeholder="••••••" style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '9px 12px', fontSize: '12px', margin: '6px 0 12px' }} />

          <label style={{ fontSize: '9px', fontWeight: 700 }}>DELIVERY ADDRESS</label>
          <input placeholder="Enter your delivery address" style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '9px 12px', fontSize: '12px', margin: '6px 0 20px' }} />

          <button style={{ width: '100%', background: '#1e355d', color: 'white', padding: '11px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
            SIGN UP
          </button>

          <p style={{ fontSize: '10px', textAlign: 'center', marginTop: '12px' }}>
            Already have an account? <a href="#" style={{ color: '#3b82f6', fontWeight: 700, textDecoration: 'none' }}>Login</a>
          </p>
        </div>

      </div>
    </div>
  )
}
