import { useEffect, useState } from "react";
import styles from './ReposList.module.css';

const ReposList = ({ nomeUsuario }) => {
    const [repos, setRepos] = useState([]);
    const [estaCarregando, setEstaCarregando] = useState(true);
    const [deuErro, setDeuErro] = useState(false);

    useEffect(() => {
        setEstaCarregando(true);
        setDeuErro(false);

        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
            .then(res => res.json())
            .then(resJson => {
                if (resJson.message === "Not Found") {
                    setDeuErro(true);
                    setRepos([]);
                } else {
                    setRepos(resJson);
                }

                setTimeout(() => {
                    setEstaCarregando(false);
                }, 3000);
            })
            .catch(e => {
                setDeuErro(true);
                setEstaCarregando(false);
            });
    }, [nomeUsuario]);

    return (
        <div className="container">
            {estaCarregando && <h1>Carregando...</h1>}

            {deuErro && <h2>Usuário não encontrado</h2>}

            {!estaCarregando && !deuErro && (
                <ul className={styles.list}>
                    {repos.map(({ id, name, language, html_url }) => (
                        <li className={styles.listItem} key={id}>
                            <div className={styles.itemName}>
                                <b>Nome:</b> {name}
                            </div>
                            <div className={styles.itemLanguage}>
                                <b>Linguagem:</b> {language}
                            </div>
                            <div className={styles.itemLink}>
                                <a target="_blank" rel="noreferrer" href={html_url}>Visitar no Github</a>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReposList;
