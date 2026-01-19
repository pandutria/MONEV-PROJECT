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
    selected_ppk: UserProps;
    user: UserProps;
  }

  export interface RABProps {
    id: number;
    tender_id: number;
    tender?: TenderProps;
    program?: string | null;
    activity?: string | null;
    start_date?: string | null;
    end_date?: string | null;

    revision_count: number;
    revision_text?: string | null;

    created_by_id?: number | null;
    created_by?: UserProps | null;

    rab_details?: RabDetailProps[];
  }

  export interface RABDetailProps {
    id: number;
    rab_header_id: number;

    rab_header?: RABProps | null;

    description: string;
    volume: number;
    unit: string;
    unit_price: number;
    total: number;
  }

  interface ScheduleProps {
    id: number;
    rab_id: number;
    rab?: RabHeaderProps | null;

    start_date?: string | null;
    end_date?: string | null;
    revision_count: number;
    revision_text?: string | null;

    schedule_details?: ScheduleItemProps;

    created_by_id: number;
    created_by?: UserProps | null;
    created_at: string;
    updated_at: string;
  }

  interface ScheduleItemProps {
    id: number;

    schedule_header_id: number;
    schedule_header?: ScheduleHeaderProps | null;

    number?: string | null;
    description?: string | null;
    total_price?: number | null;
    weight?: number | null;

    created_at: string;
    updated_at: string;

    schedule_weeks?: ScheduleWeekProps[];
  }

  interface ScheduleWeekProps {
    id: number;

    schedule_item_id: number;
    schedule_item?: ScheduleItemProps[] | null;

    week_number: number;
    value: number;
  }

  // New Tender Interface Props
  interface NewTenderProps {
    tahun_anggaran: number;
    list_tahun_anggaran?: string;

    kd_klpd: string;
    nama_klpd?: string;
    jenis_klpd?: string;

    kd_satker: string;
    kd_satker_str?: string;
    nama_satker?: string;
    alamat_satker?: string;

    kd_lpse?: number;
    nama_lpse?: string;

    kd_tender?: number;
    kd_pkt_dce?: number;
    kd_rup?: string;
    kd_paket?: number;
    kd_rup_paket?: string;

    nama_paket?: string;
    lingkup_pekerjaan?: string;

    pagu?: number;
    hps?: number;
    nilai_penawaran?: number;
    nilai_terkoreksi?: number;
    nilai_negosiasi?: number;
    nilai_kontrak?: number;
    nilai_pdn_kontrak?: number;
    nilai_umk_kontrak?: number;

    sumber_dana?: string;
    kualifikasi_paket?: string;
    jenis_pengadaan?: string;
    mtd_pemilihan?: string;
    mtd_evaluasi?: string;
    mtd_kualifikasi?: string;
    kontrak_pembayaran?: string;

    status_tender?: string;
    tanggal_status?: string;

    versi_tender?: string;
    ket_ditutup?: string;
    ket_diulang?: string;

    tgl_buat_paket?: string;
    tgl_kolektif_kolegial?: string;
    tgl_pengumuman_tender?: string;

    max_lls_auditupdate?: string | null;

    nip_ppk?: string;
    nama_ppk?: string;
    jabatan_ppk?: string;
    no_sk_ppk?: string;

    nip_pokja?: string;
    nama_pokja?: string;

    kd_penyedia?: number;
    nama_penyedia?: string;
    npwp_penyedia?: string;
    npwp_16_penyedia?: string | null;
    bentuk_usaha_penyedia?: string;
    tipe_penyedia?: string;
    anggota_kso?: string;
    wakil_sah_penyedia?: string;
    jabatan_wakil_penyedia?: string;
    nama_rek_bank?: string;
    no_rek_bank?: string;
    nama_pemilik_rek_bank?: string;

    no_sppbj?: string;
    no_kontrak?: string;
    tgl_kontrak?: string;
    tgl_kontrak_awal?: string;
    tgl_kontrak_akhir?: string;
    kota_kontrak?: string;

    jenis_kontrak?: string;
    informasi_lainnya?: string;
    status_kontrak?: string;
    tgl_penetapan_status_kontrak?: string;
    alasan_penetapan_status_kontrak?: string;
    apakah_addendum?: string;
    versi_addendum?: number;
    alasan_addendum?: string;
    alasan_ubah_nilai_kontrak?: string;
    alasan_nilai_kontrak_10_persen?: string | null;

    kd_tahapan?: number;
    nama_tahapan?: string;
    kd_akt?: number;
    nama_akt?: string;
    tgl_awal?: string;
    tgl_akhir?: string;

    lokasi_pekerjaan?: string;
    url_lpse?: string;
    event_date?: string | null;
  }
}
