export default function Login(){
  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#f8fafc'}}>
      <div style={{width:'400px',background:'white',border:'1px solid #e2e8f0',borderRadius:'16px',padding:'32px',textAlign:'center'}}>
        <div style={{width:'64px',height:'64px',background:'#e8f0ff',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 10px',fontSize:'32px'}}>💧</div>
        <h1 style={{color:'#1a2a5a'}}>3 Angels Water</h1>
        <p style={{color:'#64748b',fontSize:'13px'}}>User Log In</p>

        <div style={{textAlign:'left',marginTop:'20px'}}>
          <label style={{fontSize:'10px',fontWeight:'700'}}>EMAIL OR USERNAME</label>
          <div style={{display:'flex',border:'1px solid #cbd5e1',borderRadius:'10px',padding:'11px 14px',marginTop:'6px',marginBottom:'16px'}}>
            👤 <input style={{border:'none',outline:'none',width:'100%',marginLeft:'8px'}} placeholder="Enter your e-mail"/>
          </div>

          <label style={{fontSize:'10px',fontWeight:'700'}}>PASSWORD</label>
          <div style={{display:'flex',border:'1px solid #cbd5e1',borderRadius:'10px',padding:'11px 14px',marginTop:'6px'}}>
            🔑 <input type="password" style={{border:'none',outline:'none',width:'100%',marginLeft:'8px'}} placeholder="Enter your password"/>
          </div>

          <button style={{width:'100%',background:'#1e355d',color:'white',padding:'12px',borderRadius:'10px',fontWeight:'700',border:'none',marginTop:'20px'}}>LOG IN</button>
          <p style={{fontSize:'11px',textAlign:'center',marginTop:'16px',color:'#3b82f6'}}>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
      </div>
    </div>
  )
}
