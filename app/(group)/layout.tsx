export default function Layout({ children, auth }: any) {
  // const asyncStorage = require('next/dist/client/components/static-generation-async-storage.external')
  // //@ts-ignore
  // const staticStore = (fetch as any).__nextGetStaticStore?.() || asyncStorage.staticGenerationAsyncStorage
  // const store = staticStore.getStore()
  // store.isOnDemandRevalidate = store?.isOnDemandRevalidate && !(process.env.OPEN_NEXT_ISR === 'true')
  return <div>
    Hello Group
    {children}
    {auth}
  </div>
}