import Client from './client'

export default function Help() {
  return <div>Help I'm server rendered but my bastard child is client rendered:
    <Client />
  </div>
}