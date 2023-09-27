export default function Layout({ children, auth }: any) {
  return <>
    {children}
    {auth}
  </>
}