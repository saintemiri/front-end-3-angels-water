import { Link } from 'react-router-dom'

export default function Signup(){
  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#f8fafc',padding:'20px'}}>
      <div style={{background:'white',padding:'32px',borderRadius:'16px',width:'100%',maxWidth:'400px',textAlign:'center',border:'1px solid #e2e8f0',boxShadow:'0 4px 20px rgba(0,0,0,0.05)'}}>
        <div style={{width:'60px',height:'60px',background:'#1a2a5a',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',color:'white',fontSize:'24px'}}>💧</div>
        <h1 style={{color:'#1a2a5a',margin:'0',fontSize:'22px',fontWeight:'800'}}>Create Your Account</h1>
        <p style={{fontSize:'13px',color:'#64748b',margin:'6px 0 20px'}}>Sign up to manage your deliveries</p>
        
        <input placeholder="Full Name" style={{width:'100%',padding:'12px',marginTop:'8px',borderRadius:'8px',border:'1px solid #cbd5e1',boxSizing:'border-box'}} />
        <input placeholder="Email Address" style={{width:'100%',padding:'12px',marginTop:'10px',borderRadius:'8px',border:'1px solid #cbd5e1',boxSizing:'border-box'}} />
        <input placeholder="Password" type="password" style={{width:'100%',padding:'12px',marginTop:'10px',borderRadius:'8px',border:'1px solid #cbd5e1',boxSizing:'border-box'}} />
        <input placeholder="Confirm Password" type="password" style={{width:'100%',padding:'12px',marginTop:'10px',borderRadius:'8px',border:'1px solid #cbd5e1',boxSizing:'border-box'}} />
        
        <button style={{width:'100%',marginTop:'20px',background:'#1e355d',color:'white',padding:'12px',borderRadius:'8px',border:'none',fontWeight:'700',cursor:'pointer'}}>SIGN UP</button>
        
        <p style={{fontSize:'13px',marginTop:'16px'}}>Already have an account? <Link to="/login" style={{color:'#1e355d',fontWeight:'700',textDecoration:'none'}}>Log In</Link></p>
      </div>
    </div>
  )
}
