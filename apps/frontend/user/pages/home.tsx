import { Button } from "@chakra-ui/react"
import { useEffect } from "react"
import { useAuth } from "../lib/useAuth/useAuth"
import { NextPageWithLayout } from "../type/app-type"

const HomePage: NextPageWithLayout = (props) => {
  const { user } = useAuth()
  return (
    <>
      <div>
        Hello {JSON.stringify(user)}
      </div>
      <div>

      </div>
      <div>
        <Button>
          Test click me
        </Button>
      </div>
    </>
  )
}

export default HomePage