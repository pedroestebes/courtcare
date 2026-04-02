-- CourtCare Seed Data: 3 Tennis Drills

INSERT OR REPLACE INTO drills (id, slug, name, sport, category, difficulty, description, instructions, reference_angles) VALUES
(
  'cc-drill-tennis-serve',
  'tennis-serve',
  'Tennis Serve',
  'tennis',
  'serve',
  'intermediate',
  'The tennis serve is the most important shot — it starts every point. Bad serve mechanics are the #1 cause of shoulder injuries in racket sports.',
  '["Start with feet shoulder-width apart, side-on to the baseline","Toss the ball slightly in front and to the right","Drop the racket behind your back — full trophy position","Drive up from your legs and rotate your hips and torso","Extend your arm up to contact — highest reachable point","Pronate your forearm through contact","Follow through across your body to decelerate safely"]',
  '{"rightShoulder":140,"rightElbow":90,"shoulderRotation":-25,"leftKnee":135}'
),
(
  'cc-drill-tennis-forehand',
  'tennis-forehand',
  'Tennis Forehand',
  'tennis',
  'groundstroke',
  'beginner',
  'The forehand is the most used shot in tennis. Focus on hip rotation for power instead of arming the ball to protect your elbow.',
  '["Start in ready position with knees bent","Turn your shoulders and hips as the ball approaches","Take the racket back with a relaxed arm","Step into the ball with your front foot","Contact the ball in front of your body","Finish with the racket over your opposite shoulder"]',
  '{"rightElbow":120,"rightShoulder":70,"shoulderRotation":-20,"leftKnee":140}'
),
(
  'cc-drill-tennis-backhand',
  'tennis-backhand',
  'Tennis Backhand',
  'tennis',
  'groundstroke',
  'beginner',
  'The two-handed backhand provides stability and power while protecting the wrist and elbow by sharing load across both arms.',
  '["Start in ready position with both hands on the racket","Turn your hips and shoulders to the backhand side","Take the racket back as a unit","Step into the ball with your front foot","Contact the ball in front of your leading hip","Follow through high with both hands above your shoulder"]',
  '{"leftElbow":120,"leftShoulder":70,"shoulderRotation":15,"rightKnee":140}'
);
