import React from 'react'
import { useForm } from 'react-hook-form'

export default function ProfileForm({ token, onProfileSaved }){
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    try{
      const res = await fetch('http://localhost:4000/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        body: JSON.stringify(data)
      })
      if(res.ok){
        onProfileSaved()
      } else {
        const j = await res.json()
        alert(j.error || 'Could not save profile')
      }
    }catch(err){
      alert('Network error')
    }
  }

  return (
    <div>
      <h2>Complete your profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{marginTop:12}}>
        <div>
          <label>Name</label><br/>
          <input {...register('name', { required: true, minLength:3 })} />
          {errors.name && <div className="error">Name is required (min 3 chars)</div>}
        </div>
        <div style={{marginTop:10}}>
          <label>Email</label><br/>
          <input {...register('email')} placeholder="you@example.com" />
        </div>
        <div style={{marginTop:10}}>
          <label>Phone</label><br/>
          <input {...register('phone')} placeholder="+91..." />
        </div>
        <div style={{marginTop:8}} className="muted">Either email or phone is required</div>
        <div style={{marginTop:12}}>
          <button className="btn" type="submit">Save Profile</button>
        </div>
      </form>
    </div>
  )
}
