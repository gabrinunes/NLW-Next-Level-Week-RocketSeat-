import React,{useEffect,useState} from 'react'
import {View,Image,Text,ImageBackground} from 'react-native'
import {Feather as Icon} from '@expo/vector-icons'
import {RectButton} from 'react-native-gesture-handler'
import {useNavigation} from '@react-navigation/native'
import RNPickerSelect from 'react-native-picker-select';
import api from 'axios'
import styles from './styles'

interface IBGEUFResponse{
    sigla:string
}

interface IBGECityResponse{
    nome:string
}
const Home = ()=>{
    const navigation = useNavigation()
    const [ufs,setUfs]=useState<string[]>([])
    const [cities,setCities]=useState<string[]>([])
    const [selectedUf,setSelectedUf] = useState('0')
    const [selectedCity,setSelectedCity] = useState('0')
    function handleNavigateToPoints(uf:String,city:String){
        navigation.navigate('Points',{uf,city})
        
    }

    useEffect(()=>{
      api.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response=>{
          const ufInitials = response.data.map(uf=>uf.sigla)
          setUfs(ufInitials)
      })
    },[])


    useEffect(()=>{
        if(selectedUf==='0'){
            return;
        }
        api.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response=>{
            const cityNames = response.data.map(uf=>uf.nome)
            setCities(cityNames)
        })
    },[selectedUf])

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
            <RNPickerSelect
            style={{inputAndroid:{
                backgroundColor:'#FFF',
                height:60,
                marginBottom:8,
                fontSize:16
            }}}
            onValueChange={(value) => setSelectedUf(value)}
            placeholder={{label: 'Selecione o seu Estado'}}
            items={ufs.map(uf=>(
                {label:uf,value:uf}
            ))}
        /> 
        <RNPickerSelect
         style={{inputAndroid:{
          backgroundColor:'#FFF',
          height:60,
          marginBottom:8,
          fontSize:16
        }}}
        onValueChange={(value) => setSelectedCity(value)}
        placeholder={{label: 'Selecione sua cidade'}}
        items={cities.map(city=>(
            {label:city,value:city}
        ))}
        
        />

              <RectButton style={styles.button} onPress={()=>handleNavigateToPoints(selectedUf,selectedCity)}>
                <View style={styles.buttonIcon}>
                    <Text>
                        <Icon name="arrow-right" color="#fff" size={24}/>
                    </Text>
                </View>
                <Text style={styles.buttonText}>
                    Entrar
                </Text>
              </RectButton>
            </View>
        </ImageBackground>
    )
}
export default Home;