import { Button, Container } from "@chakra-ui/react"
import axios from "axios"
import { useState } from "react"
import { AuthContext, useAuth } from "../lib/auth/useAuth"
import { NextPageOptions } from "../type/app-type"

const HomePage: NextPageOptions = (props) => {
  const [data, setData] = useState<{message: string, user: any}>()
  const [isLoading, setIsLoading] = useState(false)

  const ShowData = () => {
    if(!data) return <div>Tidak ada data</div>
    return (
      <>
        <div>
          {data.message}
        </div>
        <div>
          {JSON.stringify(data.user)}
        </div>
      </>
    )
  }

  const fetchData = async () => {
    setIsLoading(true)
    try{
      const res = await axios.get('/api/secret')
      setData(res.data)
    }catch(err){
      console.log(err)
    }
    setIsLoading(false)
  }

  return (
    <>
    <Container>
      <div>
        Hello <AuthContext.Consumer>
          {value => value?.user?.picture}
        </AuthContext.Consumer>
      </div>
      {ShowData()}
      <div>
        <Button onClick={() => fetchData()} isLoading={isLoading}>
          Test click me
        </Button>
      </div>
    </Container>
    </>
  )
}

export default HomePage