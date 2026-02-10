import { useMenuNavigation } from '@/app/_lib/ui/useMenuNavigation';
import { playSound, uiSounds } from '@/app/_lib/audio/SoundsLibrary';
import SelectSongScreen from '@/app/_components/screens/SelectSongScreen';

function page() {
  return <SelectSongScreen />;
}

export default page;
