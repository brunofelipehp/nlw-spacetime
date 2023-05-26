import Icon from '@expo/vector-icons/Feather';
import { Link } from 'expo-router';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NlwLogo from '../src/assets/nlw-spacetime-logo.svg';


export default function Memories() {
  const { bottom, top } = useSafeAreaInsets()
  return (
    <ScrollView
      className='flex-1 px-8'
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className='mt-4 flex-row items-center justify-between'>
        <NlwLogo />
        <View className='flex-row gap-2'>
          <Link href="/new" asChild>
            <TouchableOpacity className='h-10 w-10 items-center justify-center rounded-full bg-green-500'>
              <Icon name="plus" size={16} color="#000" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>


    </ScrollView>
  )
}
