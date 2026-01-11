export { };

declare global {
  export interface RoleProps {
    id: number;
    name: string;
  }

  export interface UserProps {
    email: string
    password: string
    role_id: number
    role: RoleProps

    fullname: string
    is_active?: boolean

    nik?: string
    nip?: string
    group?: string
    address?: string

    phone_number?: string
    opd_organization?: string

    sk_number?: string
    pbj_number?: string
    competence_number?: string

    satker_code?: number
    gp_id?: number
  }

  export interface pokjaGroupProps {
    id: number;
    name: string;
  }
}
