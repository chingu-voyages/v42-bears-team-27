import { AlertDialog, AlertDialogContent, Progress } from 'src/components/ui';
import type { IResults } from './ExerciseView';

type Props = {
  open: boolean;
  results: IResults;
  onConfirm: () => void;
};

const ResultsDialog: React.FC<Props> = ({ open, results, onConfirm }) => (
  <AlertDialog open={open}>
    <AlertDialogContent
      sx={{
        p: 3,
        // NOTE: REALLY HACKY CSS HERE. Consider modifying this
        // ui component to handle these sort of scenarios
        '& div': {
          justifyContent: 'center !important',
          '& button:first-of-type': {
            display: 'none',
          },
        },
      }}
      title="Here are your results from the exercise!"
      description="If you have a task to complete this exercise, this will be automatically marked as complete since you've submitted your answers already"
      width="32rem"
      height="min-content"
      onConfirm={onConfirm}
    >
      <div sx={{ my: 4, mb: 5 }}>
        <p
          sx={{
            variant: 'text.label',
            textAlign: 'center',
            color: results.message.color,
          }}
        >
          {results.message.text}
        </p>
        <Progress
          sx={{
            mx: 'auto',
            '& div': { bg: results.message.color },
          }}
          value={results.score}
        />
      </div>
    </AlertDialogContent>
  </AlertDialog>
);

export default ResultsDialog;
