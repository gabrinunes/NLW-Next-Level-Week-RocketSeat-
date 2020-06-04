import React from 'react'
import {View,Image,Text,ImageBackground} from 'react-native'

import styles from './styles'
const Home = ()=>{
    return(
        <ImageBackground 
        source={require('../../assets/home-background.png')} 
        style={styles.container}
        imageStyle={{width:274,height:368}}
        >
            <View style={styles.main}>
            <Image source={require('../../assets/logo.png')}/> 
            <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
            <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
            </View>

            <View style={styles.footer}>
                
            </View>
        </ImageBackground>
    )
}
export default Home;