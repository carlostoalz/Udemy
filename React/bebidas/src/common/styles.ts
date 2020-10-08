import { makeStyles, Theme } from '@material-ui/core/styles';
import { IModalStyle } from '../interfaces/IModalStyle';

export const getModalStyle = (): IModalStyle => {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

export const useStyles = makeStyles( (theme:Theme) => ({
    paper: {
      position: 'absolute',
      width: 450,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));