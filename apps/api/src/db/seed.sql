-- CourtCare Seed Data: 6 Padel Drills

INSERT OR REPLACE INTO drills (id, slug, name, sport, category, difficulty, description, instructions, reference_angles) VALUES
(
  'cc-drill-ready-position',
  'ready-position',
  'Ready Position',
  'padel',
  'fundamentals',
  'beginner',
  'Master the proper padel ready stance. This is the foundation for all shots in padel. A good ready position allows you to react quickly to any ball coming your way, whether it''s a volley, a groundstroke, or an overhead.',
  '["Stand with your feet shoulder-width apart, weight on the balls of your feet","Bend your knees slightly to lower your center of gravity","Hold the racket in front of your body at chest height with both hands","Keep your elbows slightly bent and away from your body","Lean your upper body slightly forward from the hips","Keep your head up and eyes focused on the opponent","Stay relaxed but alert, ready to move in any direction","Continental grip on the racket for quick transitions between forehand and backhand"]',
  '{"leftKnee":150,"rightKnee":150,"leftElbow":110,"rightElbow":110,"leftShoulder":45,"rightShoulder":45,"torsoLean":10,"hipAngle":160}'
),
(
  'cc-drill-forehand-volley',
  'forehand-volley',
  'Forehand Volley',
  'padel',
  'volleys',
  'beginner',
  'Learn the forehand volley technique at the net. The forehand volley is one of the most used shots in padel, especially during net play. A clean, controlled volley can win you easy points and keep pressure on your opponents.',
  '["Start from the ready position at the net, approximately 1-2 meters from the net","Step forward with your left foot (right-handers) as you prepare for the volley","Turn your shoulders slightly to the right to prepare the racket","Keep the racket head above your wrist at all times","Make contact with the ball in front of your body, at or above net height","Use a short, punching motion — do not swing the racket back","Follow through slightly forward and down after contact","Return to the ready position immediately after the shot"]',
  '{"rightElbow":120,"rightShoulder":60,"rightWrist":170,"leftKnee":140,"rightKnee":155,"torsoRotation":20,"hipAngle":165,"leftShoulder":30}'
),
(
  'cc-drill-backhand-volley',
  'backhand-volley',
  'Backhand Volley',
  'padel',
  'volleys',
  'beginner',
  'Master the backhand volley at the net. The backhand volley is essential in padel doubles, as many returns come to your backhand side. A solid backhand volley with good racket control will make you a formidable net player.',
  '["Start from the ready position at the net with continental grip","Step forward with your right foot (right-handers) toward the ball","Rotate your shoulders to the left to bring the racket across your body","Keep the racket head above wrist level and slightly open-faced","Make contact in front of your body, pushing through the ball","Use a compact, blocking motion with minimal backswing","Direct the ball down toward the opponents'' feet or into open court","Recover back to ready position with quick, balanced footwork"]',
  '{"leftElbow":115,"leftShoulder":55,"leftWrist":165,"rightKnee":145,"leftKnee":155,"torsoRotation":-25,"hipAngle":160,"rightShoulder":25}'
),
(
  'cc-drill-bandeja',
  'bandeja',
  'Bandeja',
  'padel',
  'overheads',
  'intermediate',
  'The bandeja is a key defensive overhead shot in padel. It''s used to neutralize lobs while maintaining your position at the net. Unlike a smash, the bandeja uses slice to keep the ball low and controlled after bouncing off the back wall.',
  '["Position yourself sideways with your left shoulder pointing toward the net","Raise your racket behind your head with your elbow at shoulder height","Use your non-racket hand to point at the ball for balance and tracking","Time your approach and let the ball drop to slightly above head height","Strike the ball with a slicing motion, brushing underneath it from right to left","Contact point should be slightly in front of and above your right shoulder","Keep your wrist firm and angle the racket face slightly open at contact","Follow through across your body toward your left hip","Land on your front foot and recover your net position quickly"]',
  '{"rightElbow":90,"rightShoulder":150,"leftShoulder":100,"rightKnee":155,"leftKnee":140,"torsoRotation":45,"hipAngle":170,"rightWrist":160}'
),
(
  'cc-drill-vibora',
  'vibora',
  'Vibora',
  'padel',
  'overheads',
  'advanced',
  'The vibora (snake) is an aggressive overhead shot with heavy side spin. It''s more offensive than the bandeja and is used to put pressure on opponents. The spin makes the ball kick unpredictably off the glass walls, making it very difficult to return.',
  '["Adopt a strong sideways stance with knees bent for explosive movement","Prepare early by raising the racket high behind your head with a coiled torso","Point at the ball with your free hand for precise tracking","Rotate your hips and torso explosively as you initiate the swing","Strike the ball at the highest comfortable point above your shoulder","Apply heavy pronation and side-spin by brushing aggressively across the ball","Snap your wrist at contact to generate maximum spin","Follow through sharply across and down your body","The ball should travel with a flat-to-descending trajectory with strong lateral spin","Recover your net position immediately, anticipating a weak return"]',
  '{"rightElbow":85,"rightShoulder":160,"leftShoulder":110,"rightKnee":145,"leftKnee":135,"torsoRotation":55,"hipAngle":165,"rightWrist":145}'
),
(
  'cc-drill-smash',
  'smash',
  'Smash',
  'padel',
  'overheads',
  'intermediate',
  'The padel smash is a powerful overhead shot aimed at winning the point outright or forcing a very weak return. The padel smash often targets the side glass or is hit with enough power to send the ball over the back wall for a direct winner.',
  '["Move quickly under the ball with small adjustment steps","Turn sideways with your non-racket shoulder facing the net","Bend your knees and load your weight onto your back foot","Raise the racket behind your head with your elbow pointing up","Track the ball with your free hand extended upward","Drive upward from your legs and rotate your hips and torso toward the net","Extend your arm fully and make contact at the highest point you can reach","Hit flat through the ball with a strong wrist snap for maximum power","Aim the ball down into the court, targeting the side wall or back glass","Follow through completely and be ready for the ball to come back off the walls"]',
  '{"rightElbow":80,"rightShoulder":170,"leftShoulder":105,"rightKnee":140,"leftKnee":130,"torsoRotation":50,"hipAngle":175,"rightWrist":155}'
);
