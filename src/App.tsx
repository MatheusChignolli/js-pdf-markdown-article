import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { toPng } from 'html-to-image';
import html2pdf from 'html2pdf.js';
import './App.css';

function App() {
  const [markdown, setMarkdown] = useState(`
# Lista de Compras para o Churrasco

## Itens Essenciais
1. **Carne (picanha, fraldinha ou linguiça)**  
   Descrição: O principal do churrasco, escolha cortes de qualidade e quantidade suficiente para os convidados.

2. **Carvão**  
   Descrição: Fundamental para acender a churrasqueira e manter a brasa no ponto certo.

3. **Sal grosso**  
   Descrição: Essencial para temperar as carnes, garantindo sabor sem exageros.

4. **Pão de alho**  
   Descrição: Um acompanhamento clássico e prático que agrada a todos.

## Itens Não Essenciais
5. **Espetinhos de vegetais (pimentão, cebola e abobrinha)**  
   Descrição: Uma opção para variar o cardápio e agradar vegetarianos ou quem gosta de algo mais leve.

6. **Farofa**  
   Descrição: Tradicional para acompanhar carnes e equilibrar os sabores do churrasco.

7. **Molho vinagrete**  
   Descrição: Complemento fresco e saboroso para acompanhar a carne ou o pão.

8. **Cerveja ou refrigerante**  
   Descrição: Bebidas para refrescar e harmonizar com o clima descontraído do churrasco.
  `);

  const [inputText, setInputText] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmit = () => {
    setMarkdown(inputText);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown).then(() => {
      alert('Market list copied to clipboard!');
    });
  };

  const shareList = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Market List',
        text: markdown,
      }).then(() => {
        alert('Market list shared successfully!');
      }).catch((error) => {
        alert('Error sharing market list: ' + error);
      });
    } else {
      alert('Sharing not supported on this browser.');
    }
  };

  const generateImage = () => {
    const node = document.getElementById('markdown-content');
    if (node) {
      toPng(node)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'market-list.png';
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error('Error generating image:', error);
        });
    }
  };

  const generatePDF = () => {
    const element = document.getElementById('markdown-content');
    if (element) {
      html2pdf({})
        .from(element)
        .save('market-list.pdf');
    }
  };

  return (
    <div className="App">
      <div style={{
        display: 'flex',
        gap: '8px',
        justifyContent: 'end'
      }}>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Write about the market list"
          style={{
            width: '100%',
            padding: '12px 20px',
            boxSizing: 'border-box',
            border: '1px solid rgb(79, 79, 79)',
            borderRadius: '4px',
            fontSize: '16px',
          }}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div id="markdown-content" className="markdown-container" style={{textAlign: 'left', padding: '12px'}}>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
      <div style={{
        display: 'flex',
        gap: '8px',
        justifyContent: 'end'
      }}>
        <button onClick={copyToClipboard}>Copy List</button>
        <button onClick={shareList}>Share List</button>
        <button onClick={generateImage}>Generate Image</button>
        <button onClick={generatePDF}>Generate PDF</button>
      </div>
    </div>
  );
}

export default App;
