import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../sevices/api';

import styles from './styles.module.scss';

type ProfessionalTypeProps = {
    id: string;
    description: string;
    situation: boolean;
}



export function ProfessionalTypeList() {
    const [professionalTypes, setProfessionalTypes] = useState<ProfessionalTypeProps[]>([]);

    const navigate = useNavigate();

    function handleProfessionalTypeDetails(professionalType: ProfessionalTypeProps) {
        navigate('/professional-type', { state: professionalType })
    }

    useEffect(() => {
        api.get<ProfessionalTypeProps[]>('professional-type').then(response => {
            setProfessionalTypes(response.data);
        })
    }, [])

    return (
        <div className={styles.ProfessionalTypeListWrapper}>
            <h1 className={styles.title}>
                Listar Tipo de Profissões
            </h1>

            <div className={styles.buttonAction}>
                <Link to="/professional-type" >
                    Novo Cadastro
                </Link>
            </div>


            {professionalTypes.map(professionalType => {
                return (
                    <li onClick={() => handleProfessionalTypeDetails(professionalType)} key={professionalType.id} className={styles.professionalTypeBox}>
                        <span className={styles.professionalTypeDescription}>{professionalType.description}</span>
                        <span className={styles.professionalTypeSituation}>{professionalType.situation ? "Ativo" : "Inativo"}</span>
                    </li>
                )
            })}

        </div>
    )
}