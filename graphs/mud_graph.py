## Listing Devices
import pandas as pd
import matplotlib.pyplot as plt

def extract_columns_from_csv(file_path, columns):
    df = pd.read_csv(file_path)
    
    extracted_data = df[columns]
    
    return extracted_data

# Listing devices on the network 
def listing_devices():
    file_path = 'graphs/listing-devices.csv'
    data = extract_columns_from_csv(file_path, ['Devices', 'TAv', 'SD', 'DB Size'])
    
    fig, ax1 = plt.subplots()

    # Plotting TAv with standard deviation
    ax1.errorbar(data['Devices'], data['TAv'], yerr=data['SD'], fmt='-o', label='TAv', color='b')
    ax1.set_xlabel('Number of Devices')
    ax1.set_ylabel('Average Time (ms)')
    ax1.tick_params(axis='y')

    # Creating a second y-axis for DB Size
    ax2 = ax1.twinx()
    ax2.plot(data['Devices'], data['DB Size'], 'o--', label='DB Size', color='crimson')
    ax2.set_ylabel('Database Size (Bytes)')
    ax2.tick_params(axis='y')

    # Adding a title and showing the plot
    plt.title('Number of Devices vs Average Time')
    fig.tight_layout()

    plt.savefig('graphs/listing-devices.png')

# Applying a policy to a device
def applying_policy():
    file_path = 'graphs/applying-policy.csv'
    data = extract_columns_from_csv(file_path, ['Policies', 'TAv', 'SD', 'MUD File Size'])
    
    fig, ax1 = plt.subplots()

    # Plotting TAv with standard deviation
    ax1.errorbar(data['Policies'], data['TAv'], yerr=data['SD'], fmt='-o', label='TAv', color='b')
    ax1.set_xlabel('Number of Policies')
    ax1.set_ylabel('Average Time (ms)')
    ax1.tick_params(axis='y')
    ax1.set_xticks([2, 20, 40])

    # Creating a second y-axis for MUD File Size
    ax2 = ax1.twinx()
    ax2.plot(data['Policies'], data['MUD File Size'], 'o--', label='MUD File Size', color='crimson')
    ax2.set_ylabel('MUD File Size (Bytes)')
    ax2.tick_params(axis='y')
    ax2.set_xticks([2, 20, 40])

    # Adding a title and showing the plot
    plt.title('Number of Policies in Applied MUD File vs Average Time')
    fig.tight_layout()

    plt.savefig('graphs/applying-policy.png')
    
# Loading MUD file for a device
def active_mudfiles():
    file_path = 'graphs/active-mudfiles.csv'
    data = extract_columns_from_csv(file_path, ['Policies', 'TAv', 'SD', 'MUD File Size'])
    
    fig, ax1 = plt.subplots()

    # Plotting TAv with standard deviation
    ax1.errorbar(data['Policies'], data['TAv'], yerr=data['SD'], fmt='-o', label='TAv', color='b')
    ax1.set_xlabel('Number of Policies')
    ax1.set_ylabel('Average Time (ms)')
    ax1.tick_params(axis='y')
    ax1.set_xticks([2, 20, 40])
    
    # Creating a second y-axis for MUD File Size
    ax2 = ax1.twinx()
    ax2.plot(data['Policies'], data['MUD File Size'], 'o--', label='MUD File Size', color='crimson')
    ax2.set_ylabel('MUD File Size (Bytes)')
    ax2.tick_params(axis='y')
    ax2.set_xticks([2, 20, 40])

    # Adding a title and showing the plot
    plt.title('Number of Policies in Active MUD File vs Average Time')
    fig.tight_layout()

    plt.savefig('graphs/active-mudfiles.png')

listing_devices()
applying_policy()
active_mudfiles()