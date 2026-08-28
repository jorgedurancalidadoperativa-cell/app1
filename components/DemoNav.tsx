import Link from "next/link";
export function AdminLink({children,href}:{children:React.ReactNode;href:string}){return <Link href={href} className="btn">{children}</Link>}