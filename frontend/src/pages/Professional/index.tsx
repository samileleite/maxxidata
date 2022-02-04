import React, { useEffect, useState } from "react";
import { Field, Formik } from "formik";
import styles from './styles.module.scss';

import { api } from "../../sevices/api";
import { useLocation, useNavigate } from "react-router-dom";

type ProfessionalProps = {
    id?: string;
    name: string;
    telephone: string;
    email: string;
    professional_type_id: string;
    situation: boolean;
}

type ProfessionalTypeProps = {
    id: string;
    description: string;
}

const Professional = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const state = location.state as ProfessionalProps;

    const [professionalTypeOptions, setProfessionalTypeOptions] = useState<ProfessionalTypeProps[]>([]);
    const [loaded, setLoaded] = useState(false)

    const [professional, setProfessional] = useState<ProfessionalProps>(() => {
        if (state) {
            return {
                id: state.id,
                name: state.name,
                telephone: state.telephone,
                email: state.email,
                professional_type_id: state.professional_type_id,
                situation: state.situation

            }
        } else {
            return {
                id: '',
                name: '',
                telephone: '',
                email: '',
                professional_type_id: '',
                situation: true
            }
        }

    });

    useEffect(() => {
        async function loadProfessionalType() {
            await api.get<ProfessionalTypeProps[]>('professional-type').then(response => {
                setProfessionalTypeOptions(response.data)
            })
        }
        if (!loaded) {
            loadProfessionalType();
            setLoaded(true)
        }
    }, [loaded])

    function handleProfessional(values: any) {
        const valuesFormatted = { ...values, situation: values.situation === 'true' ? true : false }
        if (professional.id === '') {

            api.post('professional', valuesFormatted)
        } else {
            api.put(`professional/${professional.id}`, valuesFormatted)
        }
        console.log(valuesFormatted)
        console.log(professionalTypeOptions)

    }

    return (
        <div className={styles.professionalWrapper}>
            <h1 className={styles.title}>Cadastro de profissional</h1>
            <Formik
                initialValues={{
                    name: professional.name,
                    telephone: professional.telephone,
                    email: professional.email,
                    professional_type_id: professional.professional_type_id,
                    situation: professional.situation
                }}
                validate={values => { }}
                onSubmit={(values, { setSubmitting }) => {
                    handleProfessional(values)
                    setSubmitting(false)
                    navigate('/')
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div className={styles.content}>
                            <div className={styles.listInput}>
                                <input
                                    className={styles.input}
                                    name="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    placeholder="Nome"
                                />

                                <input
                                    className={styles.inputLast}
                                    name="telephone"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.telephone}
                                    placeholder="Telefone"
                                />

                                <input
                                    className={styles.inputLast}
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    placeholder="Email"
                                />


                                <Field as="select"
                                    className={styles.inputLast}
                                    name="professional_type_id"
                                    placeholder="Profissão"

                                >
                                    {professionalTypeOptions.map((op) => {
                                        return <option value={op.id}>{op.description.toUpperCase()}</option>
                                    })}
                                </Field>





                                <Field as="select"
                                    className={styles.inputLast}
                                    name="situation"
                                    placeholder="Status"
                                >
                                    <option value='true'>
                                        Ativo
                                    </option>

                                    <option value='false' >
                                        Inativo
                                    </option>

                                </Field>
                            </div>
                            <div className={styles.footerButton}>
                                <button
                                    className={styles.buttonAction}
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    Salvar
                                </button>
                            </div>
                        </div>


                    </form>
                )}
            </Formik>
        </div>
    )
}

export default Professional;
