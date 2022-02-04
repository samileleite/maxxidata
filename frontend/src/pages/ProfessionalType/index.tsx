import React, { useState } from "react";
import { Formik, Field } from "formik";
import { useLocation, useNavigate } from "react-router-dom"

import styles from './styles.module.scss';


import { api } from "../../sevices/api";

type ProfessionalTypeProps = {
    id?: string;
    description: string;
    situation: boolean;
}


const ProfessionalType = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const state = location.state as ProfessionalTypeProps;

    const [professionalType, setProfessionalType] = useState<ProfessionalTypeProps>(() => {
        if (state) {
            return {
                id: state.id,
                description: state.description,
                situation: state.situation
            }
        } else {
            return {
                id: '',
                description: '',
                situation: true,
            }
        }
    });

    async function handleProfessionalType(values: any) {
        const valuesFormatted = { ...values, situation: values.situation === 'true' ? true : false }
        if (professionalType.id === '') {
            await api.post('professional-type', valuesFormatted)
        } else {
            await api.put(`professional-type/${professionalType.id}`, valuesFormatted)
        }
    }

    return (
        <div className={styles.professionalTypeWrapper} >
            <h1 className={styles.title}>Cadastro de tipo de profissão</h1>
            <Formik
                initialValues={{ description: professionalType.description, situation: professionalType.situation }}
                validate={values => { }}
                onSubmit={(values, { setSubmitting }) => {
                    handleProfessionalType(values)
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
                                    name="description"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                    placeholder="Sua Profissão"
                                />
                                {errors.description && touched.description && errors.description}

                                <Field as="select"
                                    className={styles.inputLast}
                                    name="situation"
                                    placeholder="Status"
                                >
                                    <option value='true' >
                                        Ativo
                                    </option>

                                    <option value='false' >
                                        Inativo
                                    </option>
                                </Field>
                                {errors.situation && touched.situation && errors.situation}
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

export default ProfessionalType;