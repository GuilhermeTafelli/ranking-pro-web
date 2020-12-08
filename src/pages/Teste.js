import React, { useState, useEffect } from 'react';

export default function Teste() {
    const [count, setCount] = useState(0);

    // // Similar ao componentDidMount e componentDidUpdate:
    // useEffect(() => {
    //     // Atualiza o titulo do documento usando a API do browser
    //     document.title = `Você clicou ${count} vezes`;
    // });

    const [content, setContent] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        setLoading(true)
        const response = await api.get("/socials-media/ranking")
        console.log(response.data.socialsMedia.slice(0, 5))
        await new Promise((resolve) => setTimeout(resolve, 500))
        setContent(["as", "a"])
        console.log("1")
        setLoading(false)
        console.log("2")
    });

    return (
        <div>
            <p>Você clicou {count} vezes</p>
            <button onClick={() => setCount(count + 1)}>
                Clique aqui
      </button>
        </div>
    );
}
