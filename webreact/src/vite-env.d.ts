/// <reference types="vite/client" />
export {}
declare global {
  interface Window {
    document: any,
    wx: any,
    wxClientInfo: any,
    wxPubApiConfig: any,
    wxCorpApiConfig: any
  }
}
