import { Svg, G, Path } from 'react-native-svg';
import { useTheme } from '@react-navigation/native';

const Watchlist = ({ size = 24, color = 'gray', hasFill = false, fill = 'none' }) => {
  const { colors } = useTheme() as any;

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <G fill={hasFill ? fill : 'none'} stroke={color} strokeWidth="0.1" strokeLinecap="round" strokeLinejoin="round">
        <Path fill={color ? color : colors.textInfo} d="M3 16h5.2q-.4.55-.737 1.175T6.825 18.5q.3.7.638 1.325T8.2 21H5q-.825 0-1.412-.587T3 19zm0-2V9h8v4.325q-.25.15-.488.313T10.05 14zm10-5h8v4.325q-1.1-.65-2.337-.987T16 12q-.8 0-1.55.113t-1.45.312zM3 7V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v2zm13 16q-2.275 0-4.2-1.2T9 18.5q.875-2.1 2.8-3.3T16 14t4.2 1.2t2.8 3.3q-.875 2.1-2.8 3.3T16 23m0-2q1.05 0 1.775-.725T18.5 18.5t-.725-1.775T16 16t-1.775.725T13.5 18.5t.725 1.775T16 21m0-1q-.625 0-1.063-.437T14.5 18.5t.438-1.062T16 17t1.063.438t.437 1.062t-.437 1.063T16 20" />
      </G>
    </Svg>
  );
};

export default Watchlist;
