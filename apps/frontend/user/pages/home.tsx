import { Button } from "@chakra-ui/react"
import { AuthContext, useAuth } from "../lib/auth/useAuth"
import { NextPageOptions } from "../type/app-type"

const HomePage: NextPageOptions = (props) => {
  return (
    <>
      <div>
        Hello <AuthContext.Consumer>
          {value => value?.user?.picture}
        </AuthContext.Consumer>
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