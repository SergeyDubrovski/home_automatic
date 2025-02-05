

export interface ILogin {
    name: string
    role: 'admin' | 'user'
}
export interface ITimer {
    Relay1: string | null
    Relay2: string | null
    Timer1: string | null
    Timer2: string | null
}