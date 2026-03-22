import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../authSlice";
import { toast } from "react-toastify";
import './LogOut.css'

const LogOut = () => {
  const hasLoggedOut = useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (hasLoggedOut.current) {
      return;
    }

    hasLoggedOut.current = true;
    dispatch(logout());
    toast.success("Logged out successfully.");
    navigate("/login", { replace: true });
  }, [dispatch, navigate]);

  
  return (
    <div className='logout-container'>
      <div className='logout-content'>
        <h1>Your are successfully logout</h1>
      </div>
    </div>
  )
}

export default LogOut
