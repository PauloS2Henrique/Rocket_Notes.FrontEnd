import { Container, Links, Content } from './styles';
import { useState, useEffect } from 'react';

import { api } from '../../services/api';

import { Header } from '../../components/Header'
import { Button } from '../../components/button'
import { ButtonText } from '../../components/ButtonText'
import { Section } from '../../components/Section'
import { Tag } from '../../components/Tag'
import { useParams, useNavigate } from 'react-router-dom'

export function Details(){

  const navigate = useNavigate()
  const params = useParams();

  const [data, setData] = useState(null)


  function handleBack(){
    navigate(-1);
  }

  async function handleRemove(){
    const confirm = window.confirm("Deseja realmente remover nota?")

    if(confirm){
      await api.delete(`/notes/${params.id}`);
      handleBack()
    }
  }

  useEffect(() => {
    async function fetchNote(){
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data)
    }

    fetchNote()
  }, [])

    return(
      <Container>
        <Header/>

        {
          data && 
          <main>
            <Content>

              <ButtonText 
                title="excluir nota" 
                onClick={handleRemove}
              />

              <h1>
                {data.title}
              </h1>

              <p>
                {data.description}
              </p>

              { data.links && 
                <Section title="links úteis">
                  <Links>
                  {
                    data.links.map(link => (
                      <li key={String(link.id)}>
                        <a 
                          href={link.url} target='_blank'>
                            {link.url}
                        </a>
                      </li>
                    ))
                  }
                  
                  </Links>
                </Section>
              }

              {
                data.tags &&
                <Section title="Marcadores">
                  {
                    data.tags.map(tag => (
                      <Tag 
                        key={String(tag.id)}
                        title={tag.name}
                      />
                    ))
                  }
                </Section>
              }

              <Button 
                title="voltar"
                onClick={handleBack}
              />

            </Content>
          </main>
        }

      </Container>

    )
}