export { };

declare global {
  export interface RoleProps {
    id: number;
    name: string;
  }

  export interface UserProps {
    id: number;
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
    pokja_group_id: pokjaGroupProps

    sk_number?: string
    pbj_number?: string
    competence_number?: string

    satker_code?: number
    gp_id?: number

    sk_file: string;
    pbj_file: string;
    competence_file: string;
    file_photo: string;
  }

  export interface pokjaGroupProps {
    id: number;
    name: string;
  }

  export interface TenderProps {
    id: number;
    type: string | null;
    procurement_method: string | null;
    tender_code: string;
    rup_code: string;
    fiscal_year: number;
    satker_code: string;
    satker_name: string;
    package_name: string | null;
    funding_source: string;
    procurement_type: string | null;
    budget_value: number | null;
    hps_value: number | null;
    shipping_fee: number;
    contract_number: string | null;
    contract_date: string | null;
    ppk_name: string | null;
    ppk_position: string | null;
    company_leader: string | null;
    leader_position: string | null;
    winner_name: string | null;
    bid_value: number | null;
    negotiation_value: number | null;
    phone: string | null;
    email: string | null;
    npwp: string | null;
    winner_address: string | null;
    work_location: string | null;
    evidence_file: string | null;
    note: string | null;
    realization_status: string | null;
    package_status: string;
    delivery_status: string;
    total_value: number;
    account_code: string;
    klpd_code: string;
    rup_description: string;
    rup_name: string;
    order_date: string;
    order_id: string;
    vendor_id: number;
    total_quantity: number;
    count_product: number;
    selected_ppk_id: number | null;
    user_id: number;
    selected_ppk_id: number;
  }

}
