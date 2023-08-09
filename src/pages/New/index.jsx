import { useState } from "react";
import { Container, Form } from "./styles";

import { useNavigate } from "react-router-dom";

import { Header } from "../../components/Header"
import { Input } from "../../components/input"
import { Textarea } from "../../components/Textarea"
import { NoteItem } from "../../components/NoteItem"
import { Section } from "../../components/Section"
import { Button } from "../../components/button"
import { ButtonText } from "../../components/ButtonText"

import { api } from '../../services/api'


export function New(){
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const [links, setLinks] = useState([]);
    const [newLink, setNewLink] = useState("");

    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");
 
    const navigate = useNavigate();

    function handleBack(){
        navigate(-1);
    }

    function handleAddLink(){
        setLinks(prevState => [...prevState, newLink])
        setNewLink("");
    }

    function handleRemoveLik(deleted){
        setLinks(prevState => prevState.filter(link => link !== deleted));
    }

    function handleAddTag(){
        setTags(prevState => [...prevState, newTag]);
        setNewTag("");
    }

    function handleRemoveTag(deleted){
        setTags(prevState => prevState.filter(tag => tag !== deleted))
    }

    async function handleNewNote(){
        if(!title){
            return alert("digite o titulo da nota")
        }

        if(newLink){
            return alert("Você deixou um link no campo sem adicionar. clique no icone de + para adicionar")
        }

        if(newTag){
            return alert("Você deixou uma tag no campo sem adicionar. clique no icone de + para adicionar")
        }

        if(links.length === 0) {
            return alert("Adicione pelomenos um link.")
        }

        if(tags.length === 0) {
            return alert("Adicione pelomenos um tag.")
        }

        await api.post("/notes", {
            title,
            description,
            tags,
            links
        });

        alert ("Nota criada com sucesso!");
        handleBack();
    }
    return(
        <Container>
            <Header />

            <main>
                <Form>

                    <header>
                        <h1>Criar nota</h1>
                        <ButtonText title="Voltar"
                        onClick={handleBack}
                        />
                    </header>

                    <Input 
                    placeholder="Titulo"
                    onChange={e => setTitle(e.target.value)}
                    />

                    <Textarea 
                    placeholder="Observações"
                    onChange = {e => setDescription(e.target.value)}
                    />

                    <Section title="Links uteis" >

                        {
                            links.map((link, index) => (
                                <NoteItem
                                    key={String(index)}
                                    value = {link}
                                    onClick={() => handleRemoveLik(link)}
                                />
                            ))
                        }

                        <NoteItem
                            isNew 
                            placeholder="Novo link"
                            value = {newLink}
                            onChange = { e => setNewLink(e.target.value)}
                            onClick={handleAddLink}
                        />
                        
                    </Section>

                    <section title="Marcadores">
                        <div className="tags">
                            {
                                tags.map((tag, index) => (
                                    <NoteItem 
                                        key={String(index)}
                                        value={tag}
                                        onClick={() => handleRemoveTag(tag)}
                                    />
                                ))

                            }

                            <NoteItem 
                            isNew 
                            placeholder="Nova tag"
                            onChange={e => setNewTag(e.target.value)}
                            value={newTag}
                            onClick={handleAddTag}
                            />
                        </div>
                    </section>

                    <Button 
                    title="Salvar"
                    onClick={handleNewNote}
                    />
                </Form>
            </main>
        </Container>
    )
}