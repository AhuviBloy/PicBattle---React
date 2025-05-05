

import { useState } from "react";
import { observer } from "mobx-react-lite";
import challengeStore from "../../stores/challengeStore";
// import { useNavigate } from "react-router-dom";
import { Box, Button} from "@mui/material";
import { Grid } from '@mui/material';

import "./ChallengeList.css";
import InformationCards from "./InformationCards";

const ITEMS_PER_LOAD = 6; // מספר האתגרים שמוצגים בכל טעינה

type SortOption = 'startDate' | 'endDate';

const ChallengeList = observer(() => {
  // const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [sortOption] = useState<SortOption>('startDate');

  // const handleChallengeClick = (challengeId: number) => {
  //   navigate(`/creationsForChallenge/${challengeId}`);
  // };

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + ITEMS_PER_LOAD);
  };

  // const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   setSortOption(event.target.value as SortOption);
  // };

  const sortedChallenges = [...challengeStore.challenges].sort((a: { startDate: string; endDate: string }, b: { startDate: string; endDate: string }) => {
    if (sortOption === 'startDate') {
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    } else { // endDate
      return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
    }
  });

  const visibleChallenges = sortedChallenges.slice(0, visibleCount);
  const hasMore = visibleCount < challengeStore.challenges.length;

  // const isChallengeAvailable = (endDate: string) => {
  //   const currentDate = new Date();
  //   const challengeEndDate = new Date(endDate);
  //   return currentDate <= challengeEndDate;
  // };

  return (
    <div className="space-challenges-container">
        <section className="challenges-banner">
        </section>

      {/* תיבת בחירה למיון */}
      {/* <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 3 }}>
        <FormControl variant="outlined" size="small">
          <InputLabel>מיין לפי</InputLabel>
          <Select
            label="מיין לפי"
            value={sortOption}
            onChange={handleSortChange}
          >
            <MenuItem value="startDate">תאריך התחלה</MenuItem>
            <MenuItem value="endDate">תאריך סיום</MenuItem>
          </Select>
        </FormControl>
      </Box> */}
      
      <Box className="challenges-wrapper">
        <Grid container spacing={3} justifyContent="center">
          {visibleChallenges.map((challenge: { id: number; startDate: string; endDate: string }) => (
            <Grid item xs={12} sm={6} md={4} key={challenge.id}>
              <div className="relative">
                <InformationCards challenge={challenge} />
              </div>
            </Grid>
          ))}
        </Grid>
        
        {hasMore && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button className="show-more" variant="contained" onClick={handleLoadMore}>
              הצג עוד
            </Button>
          </Box>
        )}
      </Box>

      <footer className="simple-footer">
        <div className="footer-content">
          <p className="footer-text">© 2025 PICBATTLE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
});

export default ChallengeList;
