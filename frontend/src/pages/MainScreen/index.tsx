import styles from './styles.module.scss';

// import logoImg from '../../assets/logo.svg';
import { useState } from 'react';
import { ProfessionalTypeList } from '../../components/ProfessionalTypeList';
import { ProfessionalList } from '../../components/ProfessionalList';
import Logo from '../../components/Logo';

const MainScreen = () => {
    const [menu, setMenu] = useState("ProfessionalType");

    function handleMenu(type: string) {
        setMenu(type)
    }

    return (
        <div className={styles.homeWrapper}>
            <div className={styles.content}>
                {/* <img src={logoImg} alt="Professional control" /> */}
                <Logo />
                <div className={styles.header}>
                    <button
                        className={styles.button}
                        onClick={() => handleMenu("ProfessionalTypeList")}
                    >
                        Tipo de Profissional
                    </button>
                    <button
                        className={styles.button}
                        onClick={() => handleMenu("ProfessionalList")}
                    >
                        Profissional
                    </button>

                </div>

                {menu === "ProfessionalTypeList" && <ProfessionalTypeList />}

                {menu === "ProfessionalList" && <ProfessionalList />}

            </div>

        </div>
    )


}

export default MainScreen;