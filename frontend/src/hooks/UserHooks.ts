/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { SwalMessage } from "../utils/SwalMessage";
import API from "../server/API";

export default function useUserHooks() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roleId, setRoleId] = useState('');
    const [fullname, setFullname] = useState('');
    const [isActive, setIsActive] = useState('');
    const [nik, setNik] = useState('');
    const [nip, setNip] = useState('');
    const [group, setGroup] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [opdOrganization, setOpdOrganization] = useState('');
    const [skNumber, setSkNumber] = useState('');
    const [pbjNumber, setPbjNumber] = useState('');
    const [competenceNumber, setCompotenceNumber] = useState('');
    const [satkerCode, setSatkerCode] = useState('');
    const [gpId, setGpId] = useState('');

    const handleUserPost = async() => {
        try {
            
        } catch (error) {
            
        }
    }
}
