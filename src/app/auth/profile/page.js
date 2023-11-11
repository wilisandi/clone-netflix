import React from 'react'
import Image from 'next/image'
import ProfileRed from "@/img/profile-red.jpg"
import ProfileBlue from "@/img/profile-blue.jpg"
import ProfileGreen from "@/img/profile-green.jpg"
import ProfileYellow from "@/img/profile-yellow.jpg"
import ProfileCard from '@/components/profile/card'
import ButtonProfile from '@/components/profile/button'
const profileList = [
  {
    id:1,
    title:"Akun 1",
    img:ProfileRed,
    isPrivate:false
  },
  {
    id:2,
    title:"Akun 2",
    img:ProfileBlue,
    isPrivate:false
  },
  {
    id:3,
    title:"Akun 3",
    img:ProfileGreen,
    isPrivate:true
  },
  {
    id:4,
    title:"Akun 4",
    img:ProfileYellow,
    isPrivate:false
  }
];
const Profile = () => {
  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center'>
      <h2 className='sm:font-semibold font-bold sm:text-7xl text-3xl py-5 text-white'>Siapa yang menonton?</h2>
      <div className='grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 w-full gap-10 py-4 md:px-40 px-10'>
        {profileList.map((profile)=>{
         return (
          <ProfileCard Title={profile.title} Src={profile.img} IsPrivate={profile.isPrivate} key={profile.id} />
         ) 
        })}
      </div>
      <ButtonProfile title="Manage Profiles" />
    </div>
  )
}

export default Profile