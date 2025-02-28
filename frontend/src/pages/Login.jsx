import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from '../context/shopContext'
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { token, setToken, backendUrl, navigate } = useContext(ShopContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        if(response.data.success){
          toast.success('Account Created Successfully')
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token);
          setName('');
          setEmail('');
          setPassword('');
          setCurrentState('Login')
        }else{
          toast.error(response.data.message)
        }
      }

      if (currentState === "Login") {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password
        });

        // console.log(response.data);
      
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        }else{
          toast.error(response.data.message);
        }

      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  useEffect(()=>{
    if(token){
      navigate('/')
    }
  })

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[2px] w-8 bg-gray-800" />
      </div>

      {currentState === "Sign Up" ? (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      ) : (
        ""
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forget your password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login here
          </p>
        )}
      </div>
      <button className="bg-black text-white px-8 py-3 text-sm cursor-pointer active:bg-gray-700">
        {currentState}
      </button>
    </form>
  );
};

export default Login;
