"use client"
import { useAuthContext } from '@/app/contexts/authContext'
import { TOKEN_BAKNME } from '@/app/lib/constants-local-storage'
import { deleteLocalStorage } from '@/app/lib/localStorage'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const navigation = [
    { name: 'Dashboard', href: '/dashboard', current: true },
    { name: 'Cedente', href: '/dashboard/assignor/create', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const Header = () => {
    const router = useRouter()
    const { deleteToken } = useAuthContext()

    const logout = () => {
        deleteLocalStorage(TOKEN_BAKNME)
        deleteToken()
        router.push('/')
    }

    return (
        <Disclosure as="nav" className="bg-white shadow-md">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <Image src='/logo-bankme.png' width={28} height={28} alt="logo-bankme" className="mx-auto" />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        aria-current={item.current ? 'page' : undefined}
                                        className={classNames(
                                            item.current ? 'bg-blue-500 text-white' : 'text-black hover:bg-blue-500 hover:text-white',
                                            'rounded-md px-3 py-2 text-sm font-medium',
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                        {/* Profile dropdown */}
                        <button
                            onClick={logout}
                            className={'text-blue-500 hover:bg-blue-500 hover:text-white rounded-md px-3 py-2 text-sm font-medium'}
                        >
                            Sair
                        </button>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                                item.current ? 'bg-blue-500 text-white' : 'text-black hover:bg-blue-500 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium',
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    )
}

export default Header;