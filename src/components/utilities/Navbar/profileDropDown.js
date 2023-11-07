import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Menu, Transition } from '@headlessui/react'
import Image from 'next/image'
import React, { Fragment } from 'react'

const profileDropDown = ({ profileImage }) => {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="flex items-center gap-1">
                    <div className='w-6 h-6 rounded-sm'>
                        <Image alt='...' src={profileImage} width={100} height={100} className='rounded-sm object-cover' />
                    </div>
                    <FontAwesomeIcon icon={faCaretDown} className='text-xs' />
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-zinc-800 rounded-md bg-black shadow-md shadow-black ring-1 ring-black/5 focus:outline-none">
                    <div className="px-1 py-1 ">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${active ? 'bg-violet-500 text-white' : 'text-white'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    Edit
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${active ? 'bg-violet-500 text-white' : 'text-white'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    Duplicate
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                    <div className="px-1 py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${active ? 'bg-violet-500 text-white' : 'text-white'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    Archive
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${active ? 'bg-violet-500 text-white' : 'text-white'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    Move
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                    <div className="px-1 py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${active ? 'bg-violet-500 text-white' : 'text-white'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    Delete
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default profileDropDown