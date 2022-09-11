import { Box, Circle, Flex, Heading, Image, Text, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine, RiHeartFill, RiPlayFill } from 'react-icons/ri';
import { ShadowBgImage } from "../../style/css-helper";
import HeartStyle from '../../style/heart-style.module.css';

export interface CardGalleryCuteProps {
  title: string
  src: string
  description?: string
  totalHeart?: number
  type?: 'image' | 'video'
  onGiveHeart?: () => any
}

export const CardGalleryCuteList = (props: { items: CardGalleryCuteProps[] }) => {
  const containerList = useRef<HTMLDivElement>()

  const ButtonArrow = ({ children, onClick }) => {
    return (
      <Circle border='1px' borderColor='gray.300' color='gray.500' cursor='pointer' onClick={onClick}>
        {children}
      </Circle>
    )
  }

  const scrollTo = (to: number) => {
    const scrollLength = containerList.current.scrollWidth
    containerList.current.scrollTo({
      behavior: 'smooth',
      left: containerList.current.scrollLeft - (scrollLength / props.items.length * to)
    })
  }

  return (
    <Box overflow='hidden'>
      <Flex justifyContent='end'>
        <Flex gap='3'>
          <ButtonArrow onClick={() => scrollTo(1)}>
            <RiArrowLeftSLine size='34' />
          </ButtonArrow>
          <ButtonArrow onClick={() => scrollTo(-1)}>
            <RiArrowRightSLine size='34' />
          </ButtonArrow>
        </Flex>
      </Flex>
      <Flex ref={containerList} gap='3' flexWrap='nowrap' overflow='auto' mt='3'>
        {
          props.items.map((prop) => (
            <InvitationCardGalleryCute {...prop} />
          ))
        }
      </Flex>
    </Box>
  )
}


export const HeartAction = ({ heart }) => {
  const [inAnimation, setInAnimation] = useState(false)

  useEffect(() => {
    if (heart) {
      setInAnimation(true)
      setTimeout(() => {
        setInAnimation(false)
      }, 2000)
    }
  }, [heart])

  return <RiHeartFill size='40' color={heart ? '#e31b23' : 'white'} className={inAnimation ? HeartStyle['heart_animation'] : ''} />
}

export function InvitationCardGalleryCute(props: CardGalleryCuteProps) {
  const [heart, setHeart] = useState(false)
  const [totalHeart, setTotalHeart] = useState(0)
  const widthResponsive = useBreakpointValue({
    base: '80vw',
    md: '60vw',
    lg: '40vw',
    xl: '25vw'
  })
  const videoRefs = useRef<HTMLVideoElement>()
  const [onPlay, setOnPlay] = useState(false)

  if (props.totalHeart) {
    setTotalHeart(props.totalHeart)
  }

  const BackgroundAsset = useMemo(() => {
    // default
    if (props.type === 'image' || !props.type) {
      return <Image
        src={props.src}
        objectFit='cover'
        width='full'
        height='full'
      ></Image>
    }
    if (props.type === 'video') {
      return (
        <Box position='relative' h='full'>
          <video ref={videoRefs} src={props.src} style={{
            minHeight: '100%',
            objectFit: 'cover',
          }}></video>
        </Box>
      )
    }
  }, [])

  const addHeart = () => {
    if (!heart) {
      setHeart(true)
      setTotalHeart((prev) => prev + 1)
      if (props.onGiveHeart) {
        props.onGiveHeart()
      }
    }
  }

  const VideoButton = () => {
    if (props.type !== 'video') return;
    const videoPlay = () => {
      if (onPlay) {
        setOnPlay(false)
        videoRefs.current.pause()
      } else {
        setOnPlay(true)
        videoRefs.current.play()
      }
      videoRefs.current.onended = (e) => {
        setOnPlay(false)
      }
    }
    return (
      <Flex
        id="section_button_play"
        justifyContent='center' alignItems='center' w='full' h='full' position='absolute' top='0' left='0'
        onClick={() => videoPlay()}
        zIndex={8}
      >
        {!onPlay && <RiPlayFill color='white' size='80' />}
      </Flex>
    )
  }

  return (
    <Box flex='0 0 auto' position='relative' minH='600' overflow='hidden' w={widthResponsive}>
      <Box position='relative'
        w='full' h='full'
        zIndex={3}>
        {BackgroundAsset}
      </Box>
      <Box position='absolute' top='0' left='0' display='flex' alignItems='end' w='full' h='full' p='6'
        zIndex={10}
        _before={ShadowBgImage}
      >
        <VideoButton />
        <Flex
          id="section_action"
          alignItems='end' justifyContent='space-between' w='full'
          cursor='pointer'
          onClick={() => addHeart()}
          zIndex={10}
        >
          <Box w='80%'>
            <Heading size='md' color='white'>
              {props.title}
            </Heading>
            <Text color='white'>
              {props.description}
            </Text>
          </Box>
          <Box textAlign='center'>
            <HeartAction heart={heart} />
            <Text fontSize='28' color='white' fontWeight='bold'>
              {totalHeart}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box >
  )
}
