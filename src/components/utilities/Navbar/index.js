'use client'
import { fetchSearchResults } from '@/lib/api'
import { faBell, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Combobox, Transition } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-use'
import ProfileDropDown from './profileDropDown'
import Profil from "@/img/profile-blue.jpg"
import Scrollbar from 'smooth-scrollbar'

let typingTimer = null;
const doneTypingInterval = 500;
const Navbar = () => {
  const [selected, setSelected] = useState({ id: 0, name: '' })
  const [query, setQuery] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [isScroll, setIsScroll] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const refSearch = useRef();
  const route = useRouter();
  const location = useLocation();
  // setsearchData(async()=>await filteredSearch())
  const fetchSearchData = async () => {
    clearTimeout(typingTimer);
    setSearchData([{
      id: 0,
      name: query
    }, {
      id: 1,
      name: "Searching..."
    }])
    typingTimer = setTimeout(async () => {
      var data = await fetchSearchResults(query);
      data.unshift({
        id: 0,
        name: query
      });
      setSearchData(data);
    }, doneTypingInterval);
  }
  useEffect(() => {
    fetchSearchData();
  }, [query]);
  useEffect(() => {
    var path = window.location.href;
    var el = document.querySelectorAll(".item-nav");
    el.forEach(x => {

      if (path.search(x.href) != -1) {
        x.className = "pl-2 item-nav text-white font-bold";
      } else {
        x.className = "pl-2 item-nav";
      }
    })
  }, [location]);
  // query === ''
  //   ? people
  //   : people.filter((person) =>
  //     person.name
  //       .toLowerCase()
  //       .replace(/\s+/g, '')
  //       .includes(query.toLowerCase().replace(/\s+/g, ''))
  //   );
  const handleStateSearch = (event) => {
    event.preventDefault();
    if (isSearch) {
      setIsSearch(false);
    } else {
      setIsSearch(true);
      refSearch.current.focus();
    }
  }

  const handleSearch = (event) => {
    if (event.key == "Enter") {
      setTimeout(() => {
        event.preventDefault()
        route.push(`/search/${refSearch.current.value}`);
      }, 100);
    }
  }

  const scrollThreshold = 50;
  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(scroll.scrollTop >= scrollThreshold);
    };
    var scroll = Scrollbar.get(document.getElementById("main"));
    var checkScroll = setInterval(() => {
      if(scroll==undefined){
        scroll = Scrollbar.get(document.getElementById("main"));
        handleScroll();
        scroll.addListener(handleScroll);
      }else{
        clearInterval(checkScroll);
      }
    }, 500);
    return () => {
      if(scroll)scroll.removeListener(handleScroll)
    };
  },[]);

  return (
    <nav className={`fixed flex md:flex-row w-full items-center justify-between py-3 px-6 top-0 h-14 transition-all duration-300 ease-out z-[200] ${isScroll ? 'bg-black' : 'bg-transparent'}`}>
      <div className='md:hidden'><Link href='/' className='uppercase font-extrabold text-xl text-netflix tracking-tighter'>NAVBAR</Link></div>
      <div className='md:flex hidden items-center gap-4 text-slate-400'>
        <Link href='/beranda' className='uppercase font-bold font-sans text-xl text-netflix'>NAVBAR</Link>
        <Link href='/beranda' className='pl-2 item-nav'>Home</Link>
        <Link href='/tv' className='item-nav'>TV Shows</Link>
        <Link href='/movie' className=' item-nav'>Movies</Link>
        <Link href='/RecentlyAdded' className='item-nav'>Recently Added</Link>
        <Link href='/MyList' className='item-nav'>My List</Link>
      </div>
      <div className='flex items-center gap-4 text-slate-400'>
        <div className='relative group flex justify-end'>
          <button className={`px-2 top-0.5 ${isSearch ? '-mr-8' : 'absolute block end-1.5'} transition-[inset-inline-start,inset-inline-end] duration-300 ease-out`} onClick={handleStateSearch}><FontAwesomeIcon icon={faSearch} /></button>
          {/* <input type='text' ref={refSearch} className={`py-1 px-8 rounded-sm bg-slate-900 bg-opacity-50 focus:outline-none ${isSearch ? 'w-full opacity-100' : 'w-0 opacity-0'} transition-all ease-out duration-300`} placeholder='Search...' /> */}
          <Combobox value={selected} onChange={setSelected}>
            <div className="relative">
              <div className={`relative w-full ${isSearch ? 'w-full opacity-100' : 'w-0 opacity-0'} cursor-default overflow-hidden rounded-sm  bg-opacity-50 bg-slate-900 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm transition-all ease-out duration-300`}>
                <Combobox.Input
                  onKeyDown={handleSearch}
                  className="w-full border-none py-1 px-8 pr-10 text-sm leading-5  bg-opacity-50 bg-slate-900 focus:ring-0 rounded-sm" placeholder='Search...'
                  displayValue={(result) => result.name}
                  ref={refSearch}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery('')}
              >
                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-900 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {
                    searchData.length === 0 && query !== '' ? (
                      <div className="relative cursor-default select-none py-2 px-4">
                        Nothing found.
                      </div>
                    ) : (
                      searchData.map((result) => (
                        <Combobox.Option key={result.id}
                          className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600' : null}`}
                          value={result}>
                          {({ selected, active }) => (
                            <>
                              <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                {result.name}
                              </span>
                              {selected ?
                                (
                                  <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'}`}></span>
                                ) : null}
                            </>
                          )}
                        </Combobox.Option>
                      ))
                    )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
          <button className={`px-2 ${isSearch ? 'opacity-100 rotate-90' : 'opacity-0 rotate-0'} absolute top-0.5 end-1.5 transition-all duration-300 ease-out`} onClick={handleStateSearch}><FontAwesomeIcon icon={faTimes} /></button>
        </div>
        <div className='relative cursor-pointer'>
          <button><FontAwesomeIcon icon={faBell} /></button>
          <span className='absolute -top-1 -end-2 scale-50 bg-red-600 rounded-full text-white text-xs p-1'> 9+</span>
        </div>
        <div className='flex items-center gap-1 cursor-pointer'>
          <ProfileDropDown profileImage={Profil} />
        </div>
      </div>
    </nav>
  )
}

export default Navbar