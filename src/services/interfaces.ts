

export interface ILogin {
    name: string
    role: 'admin' | 'user'
}
export interface ITimer {
    Relay1: string | null
    Relay2: string | null
    Timer1: string | null
    Timer2: string | null
    Motor: boolean
}
export interface IHome {
    Sensor1: number
    Sensor2: number
    Sensor3: number
    Motor: boolean
}