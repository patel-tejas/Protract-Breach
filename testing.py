import pickle
import pandas as pd
from datetime import datetime
from sklearn.preprocessing import LabelEncoder

# ----------------- INPUT SECTION -----------------
from_address = '0x16f209b5332a1b4fa5bf19497ca40154c5db2f85'
to_address = '0x002f0c8119c16d310342d869ca8bf6ace34d9c39'
ts = 14738465
block_height = 5848095
value = 0.50000

# ----------------- DATETIME FEATURES -----------------
dt = pd.to_datetime(ts, unit='s')
hour = dt.hour
day = dt.day
weekday = dt.weekday()  # ✅ returns 0 (Mon) to 6 (Sun)

# ----------------- DATAFRAME CREATION -----------------
df = pd.DataFrame({
    'From': [from_address],
    'To': [to_address]
})

# ----------------- LABEL ENCODING -----------------
combined = pd.concat([df['From'], df['To']], axis=0)
le = LabelEncoder()
le.fit(combined)

df['From_encoded'] = le.transform(df['From'])
df['To_encoded'] = le.transform(df['To'])

df['Value'] = value
df['Hour'] = hour
df['Day'] = day
df['Weekday'] = weekday  # ✅ now numeric
df['BlockHeight'] = block_height

# ----------------- SELECT FEATURES FOR MODEL -----------------
X = df[['BlockHeight', 'From_encoded', 'To_encoded', 'Value', 'Hour', 'Day', 'Weekday']]

# ----------------- LOAD MODEL AND PREDICT -----------------
model_path = 'fraud_detection_model.pkl'

with open(model_path, 'rb') as f:
    model = pickle.load(f)

prediction = model.predict(X)
print("Prediction:", prediction)
