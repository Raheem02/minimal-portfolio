import { Link, Box, Text, Heading, GridItem } from "@chakra-ui/react"
import Head from "next/head"
import { useState, useRef, useEffect } from "react"
import { Grid } from "../components/Grid"
import { Experience } from "../components/Experience"
import { Avatar } from "../components/Avatar"
import { assetPath } from "../utils/assetPath"

export default function Home() {
  const [activeTab, setActiveTab] = useState('experience')
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [isSwipeMode, setIsSwipeMode] = useState(false)
  const [isTouching, setIsTouching] = useState(false)
  const containerRef = useRef(null)
  
  const tabs = ['experience', 'education', 'certificates']
  const currentTabIndex = tabs.indexOf(activeTab)
  
  // Check if screen width is below 480px
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSwipeMode(window.innerWidth < 480)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])
  
  const minSwipeDistance = 50
  
  const onTouchStart = (e) => {
    if (!isSwipeMode) return
    setIsTouching(true)
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }
  
  const onTouchMove = (e) => {
    if (!isSwipeMode) return
    setTouchEnd(e.targetTouches[0].clientX)
  }
  
  const onTouchEnd = () => {
    setIsTouching(false)
    if (!isSwipeMode || !touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    
    if (isLeftSwipe && currentTabIndex < tabs.length - 1) {
      setActiveTab(tabs[currentTabIndex + 1])
    }
    if (isRightSwipe && currentTabIndex > 0) {
      setActiveTab(tabs[currentTabIndex - 1])
    }
  }
  
  const onTouchCancel = () => {
    setIsTouching(false)
  }

  return (
    <>
      <Head>
        <title>Abdul Raheem - Software Engineer</title>
        <link rel="icon" href={assetPath("/favicon.ico")} />
        <link rel="icon" type="image/png" sizes="32x32" href={assetPath("/favicon.png")} />
        <link rel="icon" type="image/svg+xml" href={assetPath("/favicon.svg")} />
        <meta name="description" content="Abdul Raheem - Software Engineer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Box py="115px" px={4} maxWidth={500} mx="auto">
        <Grid fluid templateColumns="repeat(4, 1fr)" mb={10} alignItems="center">
          <GridItem colSpan={1}>
            <Avatar />
          </GridItem>
          <GridItem colSpan={3}>
            <Box>
              <Heading as="h1" size="lg">
                Abdul Raheem
              </Heading>
              <Text>Software Engineer</Text>
            </Box>
          </GridItem>
        </Grid>
        <Box mb={14}>
          <Heading as="h2" size="md" mb={2}>
            About
          </Heading>
          <Text>
            I'm Abdul Raheem, a software engineer passionate about building scalable applications and intuitive systems. I focus on backend development, APIs, and clean code, and I'm currently pursuing an MTech in Computer Science to explore advanced technologies.
          </Text>
        </Box>
        <Box mb={14}>
          {/* Tab Headers - Always visible with responsive styling */}
          <Box 
            display="flex" 
            gap={{ base: 6, sm: 12 }} 
            alignItems="center" 
            mb={10}
            justifyContent={{ base: "center", sm: "flex-start" }}
            flexWrap={{ base: "wrap", sm: "nowrap" }}
          >
            <Box textAlign={{ base: "center", sm: "left" }}>
              <Heading 
                as="h2" 
                size={{ base: "md", sm: "md" }}
                cursor="pointer"
                onClick={() => setActiveTab('experience')}
                color={activeTab === 'experience' ? 'white' : 'whiteAlpha.600'}
              >
                Work Experience
              </Heading>
              {activeTab === 'experience' && (
                <Box height="2px" bg="green.500" mt={2} />
              )}
            </Box>
            <Box textAlign={{ base: "center", sm: "left" }}>
              <Heading 
                as="h2" 
                size={{ base: "md", sm: "md" }}
                cursor="pointer"
                onClick={() => setActiveTab('education')}
                color={activeTab === 'education' ? 'white' : 'whiteAlpha.600'}
              >
                Education
              </Heading>
              {activeTab === 'education' && (
                <Box height="2px" bg="green.500" mt={2} />
              )}
            </Box>
            <Box textAlign={{ base: "center", sm: "left" }}>
              <Heading 
                as="h2" 
                size={{ base: "md", sm: "md" }}
                cursor="pointer"
                onClick={() => setActiveTab('certificates')}
                color={activeTab === 'certificates' ? 'white' : 'whiteAlpha.600'}
              >
                Certificates
              </Heading>
              {activeTab === 'certificates' && (
                <Box height="2px" bg="green.500" mt={2} />
              )}
            </Box>
          </Box>

          <Box 
            ref={containerRef}
            position="relative" 
            minHeight="fit-content"
            overflow="hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchCancel}
            style={{
              touchAction: isSwipeMode ? 'pan-y' : 'auto',
              userSelect: isTouching ? 'none' : 'auto'
            }}
          >
            {/* Experience Tab */}
            <Box
              width="100%"
              opacity={activeTab === 'experience' ? 1 : 0}
              transform={`translateX(${activeTab === 'experience' ? '0' : activeTab === 'education' ? '-100%' : activeTab === 'certificates' ? '100%' : '0'})`}
              transition="all 0.3s ease-in-out"
              position={activeTab === 'experience' ? 'relative' : 'absolute'}
              top={0}
              left={0}
              visibility={activeTab === 'experience' ? 'visible' : 'hidden'}
            >
              <Experience
                side="2023 - present"
                title={<>Software Engineer – Ignite<span style={{color: 'red'}}>3i</span></>}
                href="https://ignite3i.com/"
                desc="Designed and developed scalable software solutions with a strong focus on performance, secure data handling, and reliable system architecture. Contributed to end-to-end project development, streamlined data workflows, improved system efficiency, and reduced manual effort through automation and optimization."
                stack={<>
                  Java • Azure SQL • Spring Framework • JDBC<br/>
                  Hibernate • Multithreading • Cloud Integration • Git
                </>}
              />
            </Box>

            {/* Education Tab */}
            <Box
              width="100%"
              opacity={activeTab === 'education' ? 1 : 0}
              transform={`translateX(${activeTab === 'education' ? '0' : activeTab === 'experience' ? '100%' : activeTab === 'certificates' ? '-100%' : '0'})`}
              transition="all 0.3s ease-in-out"
              position={activeTab === 'education' ? 'relative' : 'absolute'}
              top={0}
              left={0}
              visibility={activeTab === 'education' ? 'visible' : 'hidden'}
            >
              <Experience
                side="2023 - 2025"
                title="MTech, Computer Science and Engineering"
                desc={<>University of Visvesvaraya College of Engineering,<br/>Bengaluru, Karnataka 560001, India</>}
                href="https://uvce.ac.in/"
              />
              <Experience
                side="2019 - 2023"
                title="BE, Computer Science and Engineering"
                desc={<>Atria Institute of Technology,<br/>Bengaluru, Karnataka 560024, India</>}
                href="https://atria.edu/"
              />
            </Box>

            {/* Certificates Tab */}
            <Box
              width="100%"
              opacity={activeTab === 'certificates' ? 1 : 0}
              transform={`translateX(${activeTab === 'certificates' ? '0' : activeTab === 'experience' ? '-100%' : activeTab === 'education' ? '100%' : '0'})`}
              transition="all 0.3s ease-in-out"
              position={activeTab === 'certificates' ? 'relative' : 'absolute'}
              top={0}
              left={0}
              visibility={activeTab === 'certificates' ? 'visible' : 'hidden'}
            >
              <Experience
                side="Oct 2024"
                title="Software Testing"
                desc="NPTEL - ID: NPTEL24CS91S452802123"
                href="https://archive.nptel.ac.in/noc/Ecertificate/?q=NPTEL24CS91S45280212303877739"
                mb={4}
              />
              <Experience
                side="Jan 2024"
                title="Software Engineer Intern"
                desc="HackerRank - ID: E7578E91EB19"
                href="https://www.hackerrank.com/certificates/e7578e91eb19"
                mb={4}
              />
              <Experience
                side="Nov 2023"
                title="Java Full Stack Web Development"
                desc="TapAcademy - ID: TA02JUN23075"
                mb={4}
              />
              <Experience
                side="Sep 2022"
                title="Problem Solving (Basic)"
                desc="HackerRank - ID: E7B79D2BB67A"
                href="https://www.hackerrank.com/certificates/e7b79d2bb67a"
                mb={4}
              />
            </Box>
          </Box>

          <Heading as="h2" size="md" mt={14} mb={10}>
            Projects
          </Heading>

          <Experience
            image={assetPath("/Insurance Management System.png")}
            imageWithDate={true}
            side="Ongoing"
            title="Insurance Management System"
            desc="Developing a multi-platform insurance management system that handles policy administration, customer data, and claims processing across web and mobile platforms with real-time synchronization and secure authentication."
            stack="Spring • React • Android • Azure SQL • JWT"
          />
          <Experience
            image={assetPath("/PhishGuard.png")}
            imageSize="48px"
            imageWithDate={true}
            side="Ongoing"
            title="PhishGuard"
            desc="Developing a phishing detection app that analyzes URLs in real time to flag malicious domains, aiming to enhance online safety with a simple and responsive interface."
            stack="React • Flask • TensorFlow"
          />
          <Experience
            image={assetPath("/Learn AR.png")}
            imageSize="38px"
            imageWithDate={true}
            side="2023"
            title="Learn with AR"
            desc="Built an augmented reality learning platform that delivered immersive 3D experiences to enhance education, with continuous improvements to performance and usability."
            stack="Unity • Blender • C#"
          />
          <Experience
            image={assetPath("/NovaSite.png")}
            imageSize="56px"
            imageWithDate={true}
            side="2022"
            title="NovaSite"
            desc="Built a responsive web platform with interactive 3D elements, optimized for smooth performance and enhanced engagement through AI-driven content generation."
            stack="React • CSS • JavaScript • Generative AI"
          />

          <Heading as="h2" size="md" mt={14} mb={10}>
            Links
          </Heading>

          <Experience
            side="LinkedIn"
            title="raheem02"
            href="https://www.linkedin.com/in/raheem02"
            mb={4}
          />
          <Experience
            side="Email"
            title="77abdulraheem@gmail.com"
            href="mailto:77abdulraheem@gmail.com"
            mb={4}
          />
        </Box>
      </Box>
    </>
  )
}
