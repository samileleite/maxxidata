import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../sevices/api';

import styles from './styles.module.scss';

type ProfessionalProps = {
    name: string;
    telephone?: string;
    email?: string;
    professionalType: string;
    professional_type_id: string;
    situation: boolean;
}

export function ProfessionalList() {
    const [professionalList, setProfessionalList] = useState<ProfessionalProps[]>([])

    const navigate = useNavigate();

    async function handleProfessionalDetails(professional: ProfessionalProps) {
        navigate('/professional', { state: professional })
        console.log(professional)
        // await api.get('professional', professional)
    }

    useEffect(() => {
        api.get<ProfessionalProps[]>('professional').then(response => {
            setProfessionalList(response.data);
        })
    }, [])

    return (
        <div className={styles.ProfessionalListWrapper}>
            <h1 className={styles.title}>
                LISTAR PROFISSIONAIS
            </h1>

            <div className={styles.buttonAction}>
                <Link to="/professional" >
                    Novo Cadastro
                </Link>
            </div>


            {professionalList.map(professional => {
                return (
                    <li onClick={() => handleProfessionalDetails(professional)} key={professional.professional_type_id} className={styles.professionalBox}>
                        <span className={styles.professionalName}>{`Nome: ${professional.name}`}</span>
                        <span className={styles.professional_type_id}>{`Profissão: ${professional.professional_type_id}`}</span>
                        <span className={styles.professionalEmail}>{`Email: ${professional.email}`}</span>
                        <span className={styles.professionalTelephone}>{`Telefone: ${professional.telephone}`}</span>
                        <span className={styles.professionalSituation}>{professional.situation ? "Ativo" : "Inativo"}</span>
                    </li>
                )
            })}

        </div>
    )
}